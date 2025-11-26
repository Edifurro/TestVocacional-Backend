const initModels = require('../../models/init-models');
const sequelize = require('../../config/db');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const models = initModels(sequelize);
const { password_resets, usuarios } = models;
const { Op } = require('sequelize');


exports.sendResetCode = async (email) => {
    try {
        const user = await usuarios.findOne({ where: { email } });
        if (!user) 
            throw { status: 404, message: 'No se encontró un usuario con ese email.' };

        // Busca el último registro para ese email
        const lastReset = await password_resets.findOne({
            where: { email },
            order: [['createdAt', 'DESC']]
        });

        // Lógica de cooldown progresivo
        let cooldown = 60; // 1 minuto inicial
        if (lastReset) {
            cooldown = lastReset.cooldown || 60;
            const lastSent = new Date(lastReset.createdAt).getTime();
            const now = Date.now();
            const diff = (now - lastSent) / 1000; // en segundos

            if (diff < cooldown) {
                const wait = Math.ceil(cooldown - diff);
                throw { status: 429, message: `Debes esperar ${wait} segundos antes de solicitar otro código.` };
            }
            // Duplica el cooldown hasta un máximo de 10 minutos (600s)
            cooldown = Math.min(cooldown * 2, 600);
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await password_resets.update({ used: 1 }, { where: { email } });
        await password_resets.create({
            email,
            code,
            expires_at: new Date(Date.now() + 10 * 60 * 1000),
            used: 0,
            cooldown // guarda el cooldown usado para el próximo intento
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testvocacionalup@gmail.com',
                pass: 'vceh jwzz ncbu yekk'
            }
        });

        await transporter.sendMail({
            from: '"Test Vocacional" <testvocacionalup@gmail.com>',
            to: email,
            subject: 'Código de recuperación',
            text: `Tu código de recuperación es: ${code}`
        });
    } catch (err) {
        console.error('Error en sendResetCode:', err);
        throw err;
    }
};
exports.verifyResetCode = async (email, code) => {
     try {
          const record = await password_resets.findOne({
               where: {
                    email,
                    code,
                    used: 0,
                    expires_at: { [Op.gt]: new Date() }
               }
          });
          return !!record;
     } catch (err) {
          console.error('Error en verifyResetCode:', err);
          throw err;
     }
};


exports.resetPassword = async (email, code, newPassword) => {
     try {
          // Validar mínimo 6 caracteres
          
          if (!newPassword || newPassword.length < 6) {
               throw { status: 400, message: 'La contraseña debe tener al menos 6 caracteres.' };
          }
          // Verifica que el código es válido y no usado/expirado
          const record = await password_resets.findOne({
               where: {
                    email,
                    code,
                    used: 0,
                    expires_at: { [Op.gt]: new Date() }
               }
          });
          if (!record) return false;

          // Busca el usuario
          const user = await usuarios.findOne({ where: { email } });
          if (!user) return false;

          // Cambia la contraseña
          user.password = await bcrypt.hash(newPassword, 10);
          await user.save();

          // Marca el código como usado
          record.used = 1;
          await record.save();

          return true;
     } catch (err) {
          console.error('Error en resetPassword:', err);
          throw err;
     }
};