import { FiArrowUpRight } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import { consult, destinations, exchangeRates, whatsapp } from "./data";
import { trackWhatsApp, WhatsAppLink } from "./whatsapp-tracking";

const amountFormat = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 2 });

export function SendQuote({ selection, onDestinationChange }) {
  const destination = destinations.find((item) => item[3] === selection.country);

  const submit = (event) => {
    event.preventDefault();
    const amountInput = event.currentTarget.elements.amount;
    const rawAmount = amountInput.value.trim();
    const amount = Number(rawAmount.replace(",", "."));

    if (
      !/^\d+(?:[.,]\d{1,2})?$/.test(rawAmount) ||
      amount <= 0 ||
      !Number.isSafeInteger(Math.round(amount * 100))
    ) {
      amountInput.setCustomValidity("Escribe un monto mayor que cero, con hasta dos decimales.");
      amountInput.reportValidity();
      return;
    }
    if (!destination) return;

    const [country] = destination;
    const message = `Hola, quiero enviar S/ ${amountFormat.format(amount)} a ${country}. ¿Cuánto recibe mi familiar y cuánto pagaré en total? ¿Cómo puede recibirlo?`;
    trackWhatsApp(selection.origin, { service: "remesa internacional", destination: country });
    window.location.assign(whatsapp + "?text=" + encodeURIComponent(message));
  };

  return (
    <div className="quotePanel">
      <div className="quoteCopy">
        <h2 id="quote-title">Cotiza tu envío</h2>
        <p>Consulta el costo total y cuánto recibirá tu familiar.</p>
      </div>
      <form className="quoteForm" onSubmit={submit}>
        <label className="quoteField" htmlFor="quote-destination">
          País de destino
          <select
            id="quote-destination"
            name="destination"
            required
            value={selection.country}
            onChange={(event) => onDestinationChange(event.currentTarget.value)}
          >
            <option value="">Elige un país</option>
            {destinations.map(([name, , , flag]) => (
              <option value={flag} key={flag}>{name}</option>
            ))}
          </select>
        </label>
        <label className="quoteField" htmlFor="quote-amount">
          Monto en soles
          <span className="quoteAmount">
            <span aria-hidden="true">S/</span>
            <input
              id="quote-amount"
              name="amount"
              inputMode="decimal"
              placeholder="300"
              required
              onChange={(event) => event.currentTarget.setCustomValidity("")}
            />
          </span>
        </label>
        <button type="submit" className="cta quoteSubmit">
          <SiWhatsapp className="icon" aria-hidden="true" focusable="false" /> Cotizar por WhatsApp
        </button>
        <div className="quoteDestination" aria-live="polite">
          {destination && (
            <>
              <img src={`/media/flags/${destination[3]}.webp`} width="20" height="20" alt="" />
              <span>
                {destination[1]} · {destination[2]}. Confirma la forma de recepción al cotizar.
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

const sendSteps = [
  ["Solicita una cotización", "Elige el país y el monto. Consulta el costo en soles y cuánto recibirá tu familiar."],
  ["Confirma los requisitos", "Revisa los documentos, el plazo y la forma de recepción con la agencia antes de enviar."],
  ["Consulta la entrega", "Escríbenos por WhatsApp para conocer el estado del envío o confirmar la entrega."],
];

export function SendSteps() {
  return (
    <>
      <h2>Cómo hacer un envío</h2>
      <ol className="sendSteps">
        {sendSteps.map(([title, description], index) => (
          <li key={title} style={{ "--step-index": index }}>
            <span className="stepNumber" aria-hidden="true">{index + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

const questions = [
  ["¿Qué documentos debo presentar?", "Ten a mano un documento de identidad vigente, como DNI, carné de extranjería o pasaporte. La agencia te indica los datos que necesita según la operación."],
  ["¿Cuánto puede demorar un envío?", "El plazo depende del destino y la forma de recepción. Pide que te confirmen el tiempo estimado al cotizar."],
  ["¿Cómo se calcula el costo del envío?", "Consulta la comisión, el tipo de cambio cuando corresponda, el total en soles y el monto final que recibirá tu familiar."],
  ["¿Se puede retirar en efectivo?", "Para envíos dentro del Perú puedes consultar por depósito bancario o retiro en agencia. Para remesas, confirma las opciones de recepción del país elegido."],
];

const rateFormat = new Intl.NumberFormat("es-PE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});
const dateFormat = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Lima",
});
const currencies = [
  ["USD", "Dólar estadounidense"],
  ["EUR", "Euro"],
];
const operations = ["compra", "venta"];

export function ExchangeBoard() {
  const updatedAt = Date.parse(exchangeRates.updatedAt);
  const hasDate = Number.isFinite(updatedAt);
  const rate = (code, operation) => {
    const value = exchangeRates[code][operation];
    return hasDate && Number.isFinite(value) && value > 0 ? value : null;
  };
  const hasRates = currencies.some(([code]) => operations.some((operation) => rate(code, operation) !== null));

  return (
    <section className="ratesPanel" id="tipo-de-cambio" aria-labelledby="rates-title">
      <h2 id="rates-title">Tipo de cambio</h2>
      <p>Compra y venta en soles por unidad.</p>
      <table aria-labelledby="rates-title">
        <thead>
          <tr>
            <th scope="col">Moneda</th>
            <th scope="col">Compra</th>
            <th scope="col">Venta</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map(([code, name]) => (
            <tr key={code}>
              <th scope="row"><strong>{code}</strong><small>{name}</small></th>
              {operations.map((operation) => {
                const value = rate(code, operation);
                return (
                  <td key={operation}>
                    {value === null ? (
                      <WhatsAppLink
                        origin="tipo_de_cambio"
                        service={operation + " " + code}
                        href={consult(`el tipo de cambio para ${operation} de ${name.toLowerCase()} (${code})`)}
                        aria-label={`Consultar ${operation} de ${name} por WhatsApp`}
                      >
                        Consultar <FiArrowUpRight aria-hidden="true" />
                      </WhatsAppLink>
                    ) : `S/ ${rateFormat.format(value)}`}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {hasRates ? (
        <p className="ratesNote">
          Actualizado el <time dateTime={exchangeRates.updatedAt}>{dateFormat.format(updatedAt)}</time> (hora de Perú).
        </p>
      ) : (
        <p className="ratesNote">Consulta la cotización de hoy por WhatsApp.</p>
      )}
    </section>
  );
}

export function QuestionsPanel() {
  return (
    <>
      <h2 id="faq-title">Preguntas frecuentes</h2>
      {questions.map(([question, answer], index) => (
        <details key={question} style={{ "--faq-index": index }}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </>
  );
}
