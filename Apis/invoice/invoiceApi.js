const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getData = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/facturas`);
		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
            return datos;
		} else if(respuesta.status === 401){
            console.log('La url no es correcta');
		} else if(respuesta.status === 404){
            console.log('El el contacto  no existe');
		} else {
            console.log('Se presento un error en la peticion consulte al Administrador');
		} 
	} catch(error){
        console.log(error);
	}
    
}
const postData = async (datos) => {
    try {
        return await fetch(`${URL_API}/facturas`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}
const patchData = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/facturas/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }

}
const deleteData = async (id) =>{

    try {
        return await fetch(`${URL_API}/facturas/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
export {
    getData as getDatas,
    postData as postDatas,
    patchData as patchDatas,
    deleteData as deleteDatas
};