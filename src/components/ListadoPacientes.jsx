import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {

  return (

    <div className="md:w-1/2 lg:w-3/5">

      {pacientes && pacientes.length ? (
        
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

          <p className="text-xl mb-10 mt-5 text-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>


          {/* LISTADO DE PACIENTES */}
          <div className="md:h-screen overflow-y-scroll">
  
            {
              pacientes.map( paciente => {
                return <Paciente 
                  key={paciente.id}
                  paciente={paciente} 
                  setPaciente={setPaciente}
                  eliminarPaciente={eliminarPaciente}
                />
              } )

            }

          </div>

        </>


      ) : (

        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

          <p className="text-xl mb-10 mt-5 text-center">
            Comienza agregando pacientes {''}
            <span className="text-indigo-600 font-bold">con el Formulario</span>
          </p>
        </>

      )}


    </div>
  )
}

export default ListadoPacientes