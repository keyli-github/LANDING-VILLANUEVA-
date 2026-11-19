import { address, mail, phone } from "./data";

const mailLink = "mailto:" + mail;
const phoneLink = "tel:" + phone.replaceAll(" ", "");

function LegalDocument({ title, titleId, children }) {
  return (
    <article className="legalDocument" tabIndex={0}>
      <header className="legalHeading">
        <h2 id={titleId}>{title}</h2>
        <p>
          Última actualización: julio 2025 · COMERCIAL INOVATEC · RUC:
          10742810611
        </p>
      </header>
      {children}
    </article>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalDocument title="Política de Privacidad" titleId="privacy-title">
      <section>
        <h3>1. Responsable del Tratamiento</h3>
        <p>
          El responsable del tratamiento de datos personales es COMERCIAL
          INOVATEC, con RUC 10742810611, con domicilio en {address}. Puede
          contactarnos a través del teléfono <a href={phoneLink}>{phone}</a> o
          al correo <a href={mailLink}>{mail}</a>.
        </p>
      </section>

      <section>
        <h3>2. Datos que Recopilamos</h3>
        <p>
          A través de este sitio web y nuestros canales de atención, podemos
          recopilar la siguiente información:
        </p>
        <ul>
          <li>Nombre completo y documento de identidad (DNI, CE, pasaporte)</li>
          <li>Número de teléfono y correo electrónico</li>
          <li>Datos bancarios necesarios para procesar transferencias</li>
          <li>Información sobre las operaciones realizadas</li>
        </ul>
      </section>

      <section>
        <h3>3. Finalidad del Tratamiento</h3>
        <p>Los datos recopilados se utilizan exclusivamente para:</p>
        <ul>
          <li>
            Prestación de los servicios de transferencia, cambio presencial de
            dólares y pagos
          </li>
          <li>Cumplimiento de obligaciones legales y regulatorias (SBS, UIF)</li>
          <li>Comunicación con el cliente sobre el estado de sus operaciones</li>
          <li>Mejora de nuestros servicios</li>
        </ul>
      </section>

      <section>
        <h3>4. Base Legal</h3>
        <p>
          El tratamiento de sus datos se basa en: (a) la ejecución del contrato
          de servicio, (b) el cumplimiento de obligaciones legales conforme a la
          Ley N° 29733 – Ley de Protección de Datos Personales del Perú, y (c) su
          consentimiento explícito cuando corresponda.
        </p>
      </section>

      <section>
        <h3>5. Compartición de Datos</h3>
        <p>
          No vendemos ni cedemos sus datos a terceros con fines comerciales.
          Únicamente compartimos información con entidades financieras aliadas
          (Kasnet, Culqi, Interbank) para la ejecución de las transacciones, y con
          autoridades competentes cuando así lo exija la ley.
        </p>
      </section>

      <section>
        <h3>6. Conservación de Datos</h3>
        <p>
          Los datos se conservan durante el tiempo necesario para la prestación
          del servicio y, posteriormente, durante los plazos legales exigidos
          por la normativa peruana aplicable (mínimo 5 años para registros
          financieros).
        </p>
      </section>

      <section>
        <h3>7. Sus Derechos</h3>
        <p>
          Conforme a la Ley N° 29733, usted tiene derecho a: acceder, rectificar,
          cancelar u oponerse al tratamiento de sus datos personales. Para
          ejercer estos derechos, escríbanos a <a href={mailLink}>{mail}</a> o
          llámenos al <a href={phoneLink}>{phone}</a>.
        </p>
      </section>

      <section>
        <h3>8. Seguridad</h3>
        <p>
          Implementamos medidas técnicas y organizativas para proteger sus datos
          contra acceso no autorizado, alteración, divulgación o destrucción.
        </p>
      </section>

      <section>
        <h3>9. Cambios en esta Política</h3>
        <p>
          Nos reservamos el derecho de actualizar esta política. Los cambios
          significativos serán notificados a través de nuestros canales de
          comunicación.
        </p>
      </section>
    </LegalDocument>
  );
}

export function TermsAndConditions() {
  return (
    <LegalDocument title="Términos y Condiciones" titleId="terms-title">
      <section>
        <h3>1. Identificación del Prestador</h3>
        <p>
          COMERCIAL INOVATEC, con RUC 10742810611, domiciliada en {address}, es
          la empresa responsable de los servicios ofrecidos bajo la marca
          comercial Inversiones Villanueva.
        </p>
      </section>

      <section>
        <h3>2. Objeto del Servicio</h3>
        <p>COMERCIAL INOVATEC presta servicios de:</p>
        <ul>
          <li>Envío de dinero nacional e internacional (remesas)</li>
          <li>Cambio de dólares de manera presencial en la agencia</li>
          <li>Pagos de servicios (agua, luz, telefonía, etc.)</li>
          <li>Giros y depósitos a cuentas bancarias</li>
          <li>Pagos en efectivo en agencia</li>
        </ul>
      </section>

      <section>
        <h3>3. Condiciones de Uso</h3>
        <p>Para hacer uso de nuestros servicios, el cliente debe:</p>
        <ul>
          <li>Ser mayor de 18 años o contar con representación legal</li>
          <li>Presentar documento de identidad válido (DNI, CE, pasaporte)</li>
          <li>Proporcionar información veraz y actualizada</li>
          <li>Cumplir con la normativa peruana de prevención de lavado de activos</li>
        </ul>
      </section>

      <section>
        <h3>4. Tipos de Cambio y Tarifas</h3>
        <p>
          Los tipos de cambio y tarifas aplicables son los vigentes al momento
          de la transacción. COMERCIAL INOVATEC se reserva el derecho de
          modificar las tarifas sin previo aviso, aunque informará a los
          clientes de cambios significativos a través de sus canales de
          comunicación.
        </p>
      </section>

      <section>
        <h3>5. Proceso de Operación</h3>
        <p>
          Una vez confirmada la operación y recibido el pago correspondiente,
          procederemos al envío en los plazos pactados. COMERCIAL INOVATEC no
          será responsable por demoras ocasionadas por terceros (bancos,
          plataformas de pago) fuera de nuestro control.
        </p>
      </section>

      <section>
        <h3>6. Prevención de Lavado de Activos</h3>
        <p>
          En cumplimiento de la Ley N° 27693 y sus modificatorias, COMERCIAL
          INOVATEC está obligada a reportar operaciones sospechosas a la Unidad
          de Inteligencia Financiera (UIF-Perú). Los clientes deben proporcionar
          el origen lícito de los fondos cuando sea requerido.
        </p>
      </section>

      <section>
        <h3>7. Limitación de Responsabilidad</h3>
        <p>
          COMERCIAL INOVATEC no será responsable por pérdidas derivadas de:
          información incorrecta proporcionada por el cliente, fuerza mayor,
          fallas de terceros, o uso fraudulento de los servicios por parte de
          personas no autorizadas.
        </p>
      </section>

      <section>
        <h3>8. Cancelaciones y Devoluciones</h3>
        <p>
          Las solicitudes de cancelación deben realizarse antes de ejecutada la
          transacción. Una vez procesada la operación, las devoluciones estarán
          sujetas a revisión y podrán implicar costos administrativos.
          Contáctenos al <a href={phoneLink}>{phone}</a> para gestionar cualquier
          cancelación.
        </p>
      </section>

      <section>
        <h3>9. Ley Aplicable y Jurisdicción</h3>
        <p>
          Los presentes términos se rigen por las leyes de la República del
          Perú. Cualquier controversia será sometida a los tribunales competentes
          de la ciudad de Trujillo, La Libertad.
        </p>
      </section>

      <section>
        <h3>10. Contacto</h3>
        <p>
          Para consultas sobre estos términos: <a href={phoneLink}>{phone}</a>
          {" · "}
          <a href={mailLink}>{mail}</a> · Lunes a Domingo 6:30am – 7:30pm.
        </p>
      </section>
    </LegalDocument>
  );
}
