import { addHours, differenceInSeconds } from "date-fns";
import { FormEvent, useEffect, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Modal from "react-modal";

import Swal from "sweetalert2";

import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useAuthStore } from "../../hooks";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeCalEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const {user} = useAuthStore();
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    startDate: new Date(),
    endDate: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length > 2 ? "is-valid" : "is-invalid";
  }, [formValues, formSubmitted]);

  useEffect(() => {
    if (activeCalEvent !== null) {
      setFormValues({
        title: activeCalEvent.title!.toString(),
        endDate: activeCalEvent.end!,
        startDate: activeCalEvent.start!,
        notes: activeCalEvent.resource.notes,
      });
    }
  }, [activeCalEvent]);

  const handleInputChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handledateChange = (date: Date, target: string) => {
    setFormValues({ ...formValues, [target]: date });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);
    const dateDiff = differenceInSeconds(
      formValues.endDate,
      formValues.startDate
    );
    if (isNaN(dateDiff) || dateDiff <= 0) {
      Swal.fire("Error en fechas", "Revise las fechas", "error");
      return;
    }

    if (formValues.title.length <= 2) return;

    startSavingEvent({
      _id: activeCalEvent?._id ? activeCalEvent._id : undefined,
      title: formValues.title,
      start: formValues.startDate,
      end: formValues.endDate,
      resource: { user: {name:user.name, _id:user.uid}, notes: formValues.notes },
    });
    closeDateModal();
    setFormSubmitted(false);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    closeDateModal();
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h2> Nuevo evento </h2>
      <hr />
      <form
        className="container"
        onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
      >
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <ReactDatePicker
            locale={es}
            selected={formValues.startDate}
            onChange={(date: Date) => handledateChange(date, "startDate")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Hora"
          ></ReactDatePicker>
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <ReactDatePicker
            minDate={formValues.startDate}
            locale={es}
            selected={formValues.endDate}
            onChange={(date: Date) => handledateChange(date, "endDate")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Hora"
          ></ReactDatePicker>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
