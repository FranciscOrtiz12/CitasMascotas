import { useState, useEffect } from 'react';
import Error from './Error';

function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {

  //! State
  const [ nombre, setNombre] = useState('');
  const [ propietario, setPropietario] = useState('');
  const [ email, setEmail] = useState('');
  const [ fecha, setFecha] = useState('');
  const [ sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);


  /* useEffect: ESCUCHA POR LOS CAMBIOS DE UNA VARIABLE O ALGO  */
  useEffect( () => {
    
    if ( Object.keys(paciente).length > 0 ){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);

    }else{
      // 'Nada en la variable de actualizar || Aun'

    }

  }, [paciente]);
  

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;

  }


  //! Envio de formulario
  const handleSubmit = ( e ) => {
    e.preventDefault();

    //! Validacion Del Formulario
    if([ nombre, propietario, email, fecha, sintomas].includes('') ){

      setError(true);
      return;
    }
    setError(false);

    // Objeto de Paciente
    const objPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    if(paciente.id){
      // Editando el registro
      objPaciente.id = paciente.id;


      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objPaciente : pacienteState );
      
      setPacientes(pacientesActualizados);
      setPaciente({});
      
    }else{
      // Nuevo Registro
      objPaciente.id = generarId()
      setPacientes([...pacientes, objPaciente]);
      
    }

    // Reiniciar el form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }



  return (
    <div className="md:w-1/2 lg:w-2/5 mx-3 sm:mb-5">

      {/* Texto cabecera */}
      <h2 className="font-black text-3xl text-center" >Seguimiento Pacientes</h2>

      <p className="text-xl mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>


      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5"
      >

        {/* MENSAJE DE ERROR */}        
        {/* { error && <Error mensaje='Todos los campos son obligatorios'/>} */}
        { error && <Error><p>Todos los campos son obligatorios</p></Error>}

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="nombre">Nombre de Mascota: </label>
          <input 
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>

        
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario: </label>
          <input 
            id="propietario"
            type="text"
            placeholder="Propietario de la Mascota"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>


        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email: </label>
          <input 
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>


        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta: </label>
          <input 
            id="alta"
            type="date"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value) }
          />
        </div>


        
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas: </label>
          <textarea 
            name="" 
            id="sintomas" 
            className="border-2 w-full mt-2 p-2 placeholder-gray-400 rounded-md" 
            placeholder="Describe los Sintomas"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value) }
            />
        </div>

        <input 
          type="submit"
          className="hover:bg-indigo-700 cursor-pointer transition-all bg-indigo-600 w-full p-3 text-white uppercase font-bold"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } 
        />

      </form>

    </div>
  )

}

export default Formulario