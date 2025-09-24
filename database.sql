-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-09-2025 a las 20:23:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test_vocacional`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id`, `nombre`) VALUES
(1, 'economica'),
(2, 'humanistica'),
(3, 'artistica'),
(4, 'salud'),
(5, 'ingenieria'),
(6, 'defensa'),
(7, 'exactas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `code` varchar(6) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id_pregunta` int(11) NOT NULL,
  `pregunta` varchar(5000) NOT NULL,
  `id_materia` int(11) DEFAULT NULL,
  `tipo` bit(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id_pregunta`, `pregunta`, `id_materia`, `tipo`) VALUES
(2, '¿Puedes establecer la diferencia conceptual entre macroeconomía y microeconomía?', 1, b'01'),
(3, '¿Si te convocara tu equipo preferido para planificar, organizar y dirigir un campo de deportes, aceptarías?', 1, b'01'),
(4, '¿Te gustaría realizar una investigación que contribuyera a hacer más justa la distribución de la riqueza?', 1, b'01'),
(5, '¿En un equipo de trabajo prefieres el rol de coordinador?', 1, b'01'),
(6, '¿Dirigirías el área de importación y exportación de una empresa?', 1, b'01'),
(7, '¿Te costearías tus estudios trabajando en una auditoría?', 1, b'01'),
(8, '¿Te resultaría gratificante ser asesor contable en una empresa reconocida?', 1, b'01'),
(9, '¿Sabes qué es el PRODUCTO INTERNO BRUTO?', 1, b'01'),
(10, '¿Te ofrecerías para organizar la despedida de soltero(a) de uno de tus amigos?', 1, b'00'),
(11, '¿Organizas tu dinero de manera que te alcance para todos tus gastos?', 1, b'00'),
(12, '¿Distribuyes tu horario adecuadamente para poder hacer todo lo planeado?', 1, b'00'),
(13, '¿Te resulta fácil coordinar un grupo de trabajo?', 1, b'00'),
(14, '¿Si una gran empresa solicita un profesional como gerente comercial, te sentirías a gusto desempeñando ese rol?', 1, b'00'),
(15, '¿Te gustaría trabajar con niños?', 2, b'01'),
(16, '¿Elegirías una carrera cuyo instrumento de trabajo fuera la utilización de un idioma extranjero?', 2, b'01'),
(17, '¿Dedicarías parte de tu tiempo para ayudar a personas de zonas vulnerables?', 2, b'01'),
(18, '¿Te ofrecerías para explicar a tus compañeros un determinado tema que ellos no entendieran?', 2, b'01'),
(19, '¿Pasarías varias horas leyendo un libro de tu interés?', 2, b'01'),
(20, '¿Te interesan los temas relacionados al pasado y a la evolución del hombre?', 2, b'01'),
(21, '¿Participarías en una investigación sobre la violencia en el fútbol (las barras bravas)?', 2, b'01'),
(22, '¿Descubriste algún filósofo o escritor que haya expresado tus mismas ideas antes?', 2, b'01'),
(23, '¿La libertad y la justicia son valores importantes en tu vida?', 2, b'01'),
(24, '¿Lucharías por una causa justa hasta las últimas consecuencias?', 2, b'01'),
(25, '¿Consideras importante que desde la escuela primaria se fomente la actitud crítica y la participación activa?', 2, b'00'),
(26, '¿Preservar las raíces culturales de nuestro país te parece importante y necesario?', 2, b'00'),
(27, '¿En una discusión entre amigos te ofreces como mediador?', 2, b'00'),
(28, '¿Eres de los que defienden causas perdidas?', 2, b'00'),
(29, '¿Te gustaría dirigir un proyecto de urbanización en tu barrio?', 3, b'01'),
(30, '¿Te atrae armar rompecabezas?', 3, b'01'),
(31, '¿Eres el que pone un toque de alegría en las fiestas?', 3, b'01'),
(32, '¿Disfrutas trabajando con arcilla o plastilina?', 3, b'01'),
(33, '¿Fuera de los horarios escolares, dedicas algún día a la semana a practicar algún deporte o actividad física?', 3, b'01'),
(34, '¿Tolerarías empezar tantas veces como fuera necesario hasta obtener el logro deseado?', 3, b'01'),
(35, '¿Cuando estás en un grupo de trabajo, te agrada producir ideas originales y que sean tenidas en cuenta?', 3, b'01'),
(36, '¿Desearías que te regalaran algún instrumento musical para tu cumpleaños?', 3, b'01'),
(37, '¿Harías el afiche para una campaña de prevención del SIDA?', 3, b'01'),
(38, '¿Cuando eliges tu ropa o decoras un ambiente, tienes en cuenta la combinación de los colores, las telas o el estilo de los muebles?', 3, b'01'),
(39, '¿Crees que los detalles son tan importantes como el todo?', 3, b'00'),
(40, '¿Te gusta más el trabajo manual que el trabajo intelectual?', 3, b'00'),
(41, '¿Harías un nuevo diseño de una prenda pasada de moda ante una reunión imprevista?', 3, b'00'),
(42, '¿Dirigirías un grupo de teatro independiente?', 3, b'00'),
(43, '¿Ante un llamado solidario, te ofrecerías para cuidar a un enfermo?', 4, b'01'),
(44, '¿Escuchas atentamente los problemas que tienen tus amigos?', 4, b'01'),
(45, '¿Convences fácilmente a otras personas sobre la validez de tus argumentos?', 4, b'01'),
(46, '¿Te sentirías a gusto trabajando en un ambiente hospitalario?', 4, b'01'),
(47, '¿Participarías en una campaña de prevención contra el virus AH1N1?', 4, b'01'),
(48, '¿Te gustaría hacer un curso de primeros auxilios?', 4, b'01'),
(49, '¿Acostumbras a leer revistas relacionadas con los últimos avances científicos y tecnológicos en el área de salud?', 4, b'01'),
(50, '¿Te gustaría investigar sobre alguna nueva vacuna?', 4, b'01'),
(51, '¿Te resulta interesante el estudio de las ciencias naturales?', 4, b'01'),
(52, '¿Ante una emergencia epidémica, participarías en una campaña brindando tu ayuda?', 4, b'01'),
(53, '¿Consideras que la salud pública debe ser prioritaria, gratuita y eficiente para todos?', 4, b'00'),
(54, '¿Estarías dispuesto a renunciar a un momento placentero para ofrecer tu servicio como profesional?', 4, b'00'),
(55, '¿Ayudas habitualmente a personas invidentes a cruzar la calle?', 4, b'00'),
(56, '¿A una posición negativa siempre planteas un pensamiento positivo?', 4, b'00'),
(57, '¿Te gustaría trabajar como profesional dirigiendo la construcción de una empresa hidroeléctrica?', 5, b'01'),
(58, '¿Cuando eras pequeño, te interesaba saber cómo estaban construidos tus juguetes?', 5, b'01'),
(59, '¿Cuando tienes que resolver un problema matemático, perseveras hasta encontrar la solución?', 5, b'01'),
(60, '¿Entablas una relación casi personal con tu computador?', 5, b'01'),
(61, '¿Te ofrecerías para colaborar como voluntario en la NASA?', 5, b'01'),
(62, '¿Harías un curso para aprender a fabricar los instrumentos y/o piezas de las máquinas o aparatos con que trabajas?', 5, b'01'),
(63, '¿Te incluirías en un proyecto nacional de desarrollo de la principal fuente de recursos de tu ciudad?', 5, b'01'),
(64, '¿Cuando se daña un electrodoméstico, rápidamente te ofreces para arreglarlo o repararlo?', 5, b'01'),
(65, '¿Te gustaría investigar científicamente sobre cultivos agrícolas?', 5, b'01'),
(66, '¿Enviarías tu hoja de vida a una empresa automotriz que solicita gente para su área de producción?', 5, b'01'),
(67, '¿Planificas detalladamente tus trabajos antes de empezar?', 5, b'00'),
(68, '¿Crees que tus ideas son importantes y haces todo lo posible para ponerlas en práctica?', 5, b'00'),
(69, '¿Trabajar con objetos te resulta más gratificante que trabajar con personas?', 5, b'00'),
(70, '¿Eres exigente y crítico con tu equipo de trabajo?', 5, b'00'),
(71, '¿Participarías en un grupo de defensa internacional dentro de alguna fuerza armada?', 6, b'01'),
(72, '¿Te dedicarías a ayudar a personas accidentadas o atacadas por asaltantes?', 6, b'01'),
(73, '¿Participarías como profesional en un espectáculo de acrobacia aérea?', 6, b'01'),
(74, '¿Te gustaría participar para mantener el orden ante grandes desórdenes o catástrofes?', 6, b'01'),
(75, '¿Aceptarías que las mujeres formaran parte de las fuerzas armadas bajo las mismas condiciones que los hombres?', 6, b'01'),
(76, '¿Te interesan las actividades de mucha acción y de reacción rápida en situaciones imprevistas y de peligro?', 6, b'01'),
(77, '¿Elegirías una profesión en la que tuvieras que estar algunos meses alejado de tu familia?', 6, b'01'),
(78, '¿Aceptarías colaborar con el cumplimiento de las normas en lugares públicos?', 6, b'01'),
(79, '¿Te gustaría realizar tareas auxiliares en un avión o aeronave, como izar velas, pintura y conservación de casco, arreglos de averías, conservación de motores?', 6, b'01'),
(80, '¿Estás de acuerdo con la formación de un cuerpo de soldados profesionales?', 6, b'01'),
(81, '¿Usar uniforme te hace sentir distinto, importante?', 6, b'00'),
(82, '¿Crees que el país debe poseer la más alta tecnología armamentista, a cualquier precio?', 6, b'00'),
(83, '¿Ante una situación de emergencia, actúas rápidamente?', 6, b'00'),
(84, '¿Arriesgarías tu vida para salvar la vida de otro que no conoces?', 6, b'00'),
(85, '¿Sabes responder qué significa ADN y ARN?', 7, b'01'),
(86, '¿Te atrae investigar sobre los misterios del universo, por ejemplo, los agujeros negros?', 7, b'01'),
(87, '¿Estás informado sobre nuevos descubrimientos que se están realizando sobre la Teoría del Big Bang?', 7, b'01'),
(88, '¿Te gustaría crear nuevas técnicas para descubrir las patologías de algunas enfermedades a través del microscopio?', 7, b'01'),
(89, '¿Te incluirías en un proyecto de investigación de los movimientos sísmicos y sus consecuencias?', 7, b'01'),
(90, '¿Te gustaría trabajar en un laboratorio mientras estudias?', 7, b'01'),
(91, '¿Te radicarías en una zona agrícola-ganadera para desarrollar tus actividades como profesional?', 7, b'01'),
(92, '¿Formarías parte de un equipo de trabajo orientado a la preservación de la flora y la fauna en extinción?', 7, b'01'),
(93, '¿Aceptarías hacer una práctica rentada en una industria de productos alimenticios, en el sector de control de calidad?', 7, b'01'),
(94, '¿Visitarías un observatorio astronómico para conocer en sección el funcionamiento de los aparatos?', 7, b'01'),
(95, '¿El trabajo individual te resulta más rápido y efectivo que el trabajo grupal?', 7, b'00'),
(96, '¿Te interesan más los misterios de la naturaleza que los secretos de la tecnología?', 7, b'00'),
(97, '¿Te inhibes al entrar a un lugar nuevo con gente desconocida?', 7, b'00'),
(98, '¿Tienes interés por saber cuáles son las causas que determinan ciertos fenómenos, aunque saberlo no incida en tu vida?', 7, b'00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `id_resultado` int(11) NOT NULL,
  `id_pregunta` int(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `metaData` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`id_resultado`, `id_pregunta`, `id_usuario`, `metaData`) VALUES
(669, 2, 6, '{\"respuesta\":true}'),
(670, 3, 6, '{\"respuesta\":true}'),
(671, 4, 6, '{\"respuesta\":true}'),
(672, 5, 6, '{\"respuesta\":true}'),
(673, 6, 6, '{\"respuesta\":true}'),
(674, 7, 6, '{\"respuesta\":true}'),
(675, 8, 6, '{\"respuesta\":true}'),
(676, 9, 6, '{\"respuesta\":true}'),
(677, 10, 6, '{\"respuesta\":true}'),
(678, 11, 6, '{\"respuesta\":true}'),
(679, 12, 6, '{\"respuesta\":true}'),
(680, 13, 6, '{\"respuesta\":true}'),
(681, 14, 6, '{\"respuesta\":true}'),
(682, 15, 6, '{\"respuesta\":false}'),
(683, 16, 6, '{\"respuesta\":false}'),
(684, 17, 6, '{\"respuesta\":false}'),
(685, 18, 6, '{\"respuesta\":false}'),
(686, 19, 6, '{\"respuesta\":false}'),
(687, 20, 6, '{\"respuesta\":false}'),
(688, 21, 6, '{\"respuesta\":false}'),
(689, 22, 6, '{\"respuesta\":false}'),
(690, 23, 6, '{\"respuesta\":false}'),
(691, 24, 6, '{\"respuesta\":false}'),
(692, 25, 6, '{\"respuesta\":false}'),
(693, 26, 6, '{\"respuesta\":false}'),
(694, 27, 6, '{\"respuesta\":false}'),
(695, 28, 6, '{\"respuesta\":false}'),
(696, 29, 6, '{\"respuesta\":true}'),
(697, 30, 6, '{\"respuesta\":true}'),
(698, 31, 6, '{\"respuesta\":true}'),
(699, 32, 6, '{\"respuesta\":true}'),
(700, 33, 6, '{\"respuesta\":true}'),
(701, 34, 6, '{\"respuesta\":true}'),
(702, 35, 6, '{\"respuesta\":true}'),
(703, 36, 6, '{\"respuesta\":true}'),
(704, 37, 6, '{\"respuesta\":true}'),
(705, 38, 6, '{\"respuesta\":true}'),
(706, 39, 6, '{\"respuesta\":true}'),
(707, 40, 6, '{\"respuesta\":true}'),
(708, 41, 6, '{\"respuesta\":true}'),
(709, 42, 6, '{\"respuesta\":true}'),
(710, 43, 6, '{\"respuesta\":false}'),
(711, 44, 6, '{\"respuesta\":false}'),
(712, 45, 6, '{\"respuesta\":false}'),
(713, 46, 6, '{\"respuesta\":false}'),
(714, 47, 6, '{\"respuesta\":false}'),
(715, 48, 6, '{\"respuesta\":false}'),
(716, 49, 6, '{\"respuesta\":false}'),
(717, 50, 6, '{\"respuesta\":false}'),
(718, 51, 6, '{\"respuesta\":false}'),
(719, 52, 6, '{\"respuesta\":false}'),
(720, 53, 6, '{\"respuesta\":false}'),
(721, 54, 6, '{\"respuesta\":false}'),
(722, 55, 6, '{\"respuesta\":false}'),
(723, 56, 6, '{\"respuesta\":false}'),
(724, 57, 6, '{\"respuesta\":true}'),
(725, 58, 6, '{\"respuesta\":true}'),
(726, 59, 6, '{\"respuesta\":true}'),
(727, 60, 6, '{\"respuesta\":true}'),
(728, 61, 6, '{\"respuesta\":true}'),
(729, 62, 6, '{\"respuesta\":true}'),
(730, 63, 6, '{\"respuesta\":true}'),
(731, 64, 6, '{\"respuesta\":true}'),
(732, 65, 6, '{\"respuesta\":true}'),
(733, 66, 6, '{\"respuesta\":true}'),
(734, 67, 6, '{\"respuesta\":true}'),
(735, 68, 6, '{\"respuesta\":true}'),
(736, 69, 6, '{\"respuesta\":true}'),
(737, 70, 6, '{\"respuesta\":true}'),
(738, 71, 6, '{\"respuesta\":false}'),
(739, 72, 6, '{\"respuesta\":false}'),
(740, 73, 6, '{\"respuesta\":false}'),
(741, 74, 6, '{\"respuesta\":false}'),
(742, 75, 6, '{\"respuesta\":false}'),
(743, 76, 6, '{\"respuesta\":false}'),
(744, 77, 6, '{\"respuesta\":false}'),
(745, 78, 6, '{\"respuesta\":false}'),
(746, 79, 6, '{\"respuesta\":false}'),
(747, 80, 6, '{\"respuesta\":false}'),
(748, 81, 6, '{\"respuesta\":false}'),
(749, 82, 6, '{\"respuesta\":false}'),
(750, 83, 6, '{\"respuesta\":false}'),
(751, 84, 6, '{\"respuesta\":false}'),
(752, 85, 6, '{\"respuesta\":true}'),
(753, 86, 6, '{\"respuesta\":true}'),
(754, 87, 6, '{\"respuesta\":true}'),
(755, 88, 6, '{\"respuesta\":true}'),
(756, 89, 6, '{\"respuesta\":true}'),
(757, 90, 6, '{\"respuesta\":true}'),
(758, 91, 6, '{\"respuesta\":true}'),
(759, 92, 6, '{\"respuesta\":true}'),
(760, 93, 6, '{\"respuesta\":true}'),
(761, 94, 6, '{\"respuesta\":true}'),
(762, 95, 6, '{\"respuesta\":false}'),
(763, 96, 6, '{\"respuesta\":false}'),
(764, 97, 6, '{\"respuesta\":false}'),
(765, 98, 6, '{\"respuesta\":false}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `curp` varchar(18) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('aspirante','admin') DEFAULT 'aspirante',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `curp`, `nombre`, `apellidos`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(3, 'MEIA030529HQRNTNA6', 'Angel', 'Mendez', 'usuario@example.com', '$2b$10$.NxbvUzkFttiRhzMPdtUf.kTLUCc9yhVx4bqZzLQtPFKNg9FslHhe', 'aspirante', '2025-09-19 20:45:17', 0),
(6, 'ROLE020901HCSBPDA9', 'Edigatason', 'Robles', 'Eample@outlook.com', '$2b$10$YGmR16RZzub/CNTeh0LlROShpw/HnwnUBYGK5e5iK6Omcs5gVedaS', 'aspirante', '2025-09-19 20:45:17', 0),
(7, 'MEIA991204HQRNTR03', 'Aaron', 'Mendez', 'Example@outlook.com', '$2b$10$kShaXms4Y3Buo9uSkT8dOucVTCmGeUUfysipH.3Nqgcmwub.whUyC', 'aspirante', '2025-09-19 20:45:17', 0),
(8, 'ROLE020901HCSBPDE1', 'EDISON', 'ROBLES', 'EDI@GMAIL.COM', '$2b$10$nCJhYssNObNfNUbHi1KVwu/TnbgKmMb4AjOwmZGr7enT3MvIf4R.6', 'aspirante', '2025-09-19 02:02:46', 2025);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id_pregunta`),
  ADD KEY `id_materia` (`id_materia`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`id_resultado`),
  ADD KEY `id_pregunta` (`id_pregunta`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `curp` (`curp`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id_pregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `id_resultado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=766;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id_pregunta`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `resultados_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
