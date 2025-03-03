import React, { useState } from 'react'; 
import { useForm } from 'react-hook-form';

function FormularioRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formState, setFormState] = useState('initial'); // El estado del formulario estando en inicial
  const paisesPermitidos = ['Mexico', 'Estados Unidos', 'España'];

  // Esto se aplicará cuando el formulario se haya enviado, guardando los datos en el localStorage
  const onSubmit = (data) => {
    setFormState('submitting'); // importante esto pa los cambios

    // Verificamos que el país esté en la lista de países permitidos
    if (!paisesPermitidos.includes(data.pais)) {
      alert('El país seleccionado no es válido.');
      setFormState('error'); // Si el país no es válido, lo ponemos en error
      return;
    }

    // Esto es pa que parezca que se envia a un backend
    setTimeout(() => {
      // Guardamos los datos en localStorage
      localStorage.setItem('formData', JSON.stringify(data));
      setFormState('success'); // Si todo es correcto, saldra a exito
      
    }, 1000); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          {...register('nombre', {
            required: 'El nombre es obligatorio',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
          })}
          placeholder="Nombre"
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}
      </div>

      <div>
        <label htmlFor="apellido">Apellido</label>
        <input
          {...register('apellido', {
            required: 'El apellido es obligatorio',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
          })}
          placeholder="Apellido"
        />
        {errors.apellido && <p>{errors.apellido.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Correo electrónico</label>
        <input
          {...register('email', {
            required: 'El correo es obligatorio',
          })}
          type="email"
          placeholder="Correo electrónico"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="contrasena">Contraseña</label>
        <input
          {...register('contrasena', {
            required: 'La contraseña es obligatoria',
            minLength: { value: 8, message: 'Mínimo 8 caracteres' },
          })}
          type="password"
          placeholder="Contraseña"
        />
        {errors.contrasena && <p>{errors.contrasena.message}</p>}
      </div>

      <div>
        <label htmlFor="edad">Edad</label>
        <input
          {...register('edad', {
            required: 'La edad es obligatoria',
            min: { value: 18, message: 'Debes tener al menos 18 años' },
          })}
          type="number"
          placeholder="Edad"
        />
        {errors.edad && <p>{errors.edad.message}</p>}
      </div>

      <div>
        <label htmlFor="telefono">Teléfono Movil</label>
        <input
          {...register('telefono', {
            required: 'El teléfono es obligatorio',
            pattern: {
              value: /^[0-9]{9}$/,
              message: 'El teléfono debe tener exactamente 9 dígitos',
            },
          })}
          placeholder="Teléfono"
        />
        {errors.telefono && <p>{errors.telefono.message}</p>}
      </div>

      <div>
        <label htmlFor="pais">País</label>
        <select {...register('pais', { required: 'Selecciona un país' })}>
          <option value="">Seleccione un país</option>
          <option value="Mexico">México</option>
          <option value="Estados Unidos">Estados Unidos</option>
          <option value="España">España</option>
        </select>
        {errors.pais && <p>{errors.pais.message}</p>}
      </div>

      <div>
        <label>
          <input
            {...register('terminos', { required: 'Debes aceptar los términos y condiciones' })}
            type="checkbox"
          />
          Acepto los términos y condiciones
        </label>
        {errors.terminos && <p>{errors.terminos.message}</p>}
      </div>

      <button type="submit" disabled={formState === 'submitting'}>Registrar</button>

      
      {formState === 'success' && <p>Formulario enviado con éxito!</p>} // EL mensaje que saldra si todo se envio bien ;P

     
      {formState === 'error' && <p>Ocurrió un error al enviar el formulario. Intenta de nuevo</p>} // El que se enviara si todo va mal ;c
    </form>
  );
}

export default FormularioRegistro;
