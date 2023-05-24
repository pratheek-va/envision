import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import './FormModal.css'

const Input = () => {
  const [state, setStateData] = useState({defaultValues: {
  }});

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: state.defaultValues });

  const action = useSelector((state) => state.form);

  const getEvent = async (eventId) => {
    const response = await axios.get(`https://envision-sfxf.onrender.com/api/v1/events/${eventId}`);
    const data = response.data.data.event;
    data.rules = data.rules.join(',');
    reset({...data});
    setStateData((currentData) => {
      return {
        ...currentData,
        defaultValues: {...currentData.defaultValues, ...data}
      }
    })
  }

  useEffect(() => {
    getEvent(action.id);
  }, [])

  const onSubmit = (data) => {
    const formData = {...data};
    formData.rules = [];
    data.rules.split(',').forEach((rule) => {
      formData.rules.push(rule.trim());
    });
    action.onClick(formData, action.id);
  };

  const closeFormModal = () => {
    dispatch({type: 'FORM_CLOSE'});
  }

  return (
    <div className="event-detail-modal" style={{overflowY: 'scroll'}}>
      <div className="app-modal-content" data-aos="zoom-in">
        <div className="app-modal-title">
          <h5>Form</h5>
        </div>
        <div className="app-form-modal">
          <form style={{overflowY: 'scroll'}}  onSubmit={handleSubmit(onSubmit)} className="app-form">
        <Form.Group  className="mb-3" controlId="name">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            defaultValue={state.defaultValues.name}
            placeholder="Name"
            {...register("name")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="venue">
          <Form.Label className="form-label">Venue</Form.Label>
          <Form.Control
            type="text"
            defaultValue={state.defaultValues.venue}
            className="form-control"
            placeholder="Venue"
            {...register("venue")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="details">
          <Form.Label className="form-label">Details</Form.Label>
          <Form.Control
            type="text"className="form-control"
            placeholder="Details"
            defaultValue={state.defaultValues.details}
            {...register("details")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="orgname">
          <Form.Label className="form-label">Organizer Name</Form.Label>
          <Form.Control
            type="text"className="form-control"
            placeholder="Organizer name"
            defaultValue={state.defaultValues.orgname}
            {...register("orgname")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="orgno">
          <Form.Label className="form-label">Organizer Number</Form.Label>
          <Form.Control
            type="text"className="form-control"
            placeholder="Organizer Number"
            defaultValue={state.defaultValues.orgno}
            {...register("orgno")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="fee">
          <Form.Label className="form-label">Fee</Form.Label>
          <Form.Control
            defaultValue={state.defaultValues.fee}
            type="text"className="form-control"
            placeholder="Fee"
            {...register("fee")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="regfee">
          <Form.Label className="form-label">Registration Fee</Form.Label>
          <Form.Control
            type="text"className="form-control"
            defaultValue={state.defaultValues.regfee}
            placeholder="Registration Fee"
            {...register("regfee")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="time">
          <Form.Label className="form-label">Time</Form.Label>
          <Form.Control
            type="text"className="form-control"
            placeholder="Time"
            defaultValue={state.defaultValues.time}
            {...register("time")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label className="form-label">Image</Form.Label>
          <Form.Control
            type="text"className="form-control"
            placeholder="Image"
            defaultValue={state.defaultValues.image}
            {...register("image")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="rules">
          <Form.Label className="form-label">Rules</Form.Label>
          <Form.Control
            type="text"className="form-control"
            defaultValue={state.defaultValues.rules}
            placeholder="Add comma between each rule"
            {...register("rules")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label className="form-label">Date</Form.Label>
          <Form.Control
            type="text"className="form-control"
            placeholder="Date"
            defaultValue={state.defaultValues.date}
            {...register("date")}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="department">
          <Form.Label className="form-label">Select department</Form.Label>
          <Form.Select {...register('department')} defaultValue={state.defaultValues.department} className="form-control" id="dropdown-basic-button" title="Dropdown button">
            <option value={'CS'}>Computer Science</option>
            <option value={'IS'}>Information Science</option>
            <option value={'MM'}>Mechanical Engineering</option>
            <option value={'ECE'}>Electronics and Communication Engineering</option>
            <option value={'ARCH'}>Architecture</option>
            <option value={'SS'}>Sports</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="type">
          <Form.Label className="form-label">Select Type</Form.Label>
          <Form.Check
            type="radio"
            className="form-label"
            defaultValue={state.defaultValues.type === "T" ? true : false}
            label="Technical"
            value="T"
            {...register("type")}
          />
          <Form.Check
            type="radio"
            label="Non Technical"
            defaultValue={state.defaultValues.type === "NT" ? true : false}
            className="form-label"
            value="NT"
            {...register("type")}
          />
          {errors.skills && <p className="errorMsg">{errors.skills.message}</p>}
        </Form.Group>
          </form>
        </div>
        <div className="app-modal-footer">
          <button
            type="button"
            className="app-modal-close"
            onClick={closeFormModal}
          >
            Close
          </button>
            <button className="app-modal-register" onClick={handleSubmit(onSubmit)}>
              Submit
            </button>
        </div>
      </div>
    </div>
  );
};

export default Input;