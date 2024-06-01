$(() => {
  console.log('se cargó el DOM');


  const setInfoModal = (nombre, balance, id) => {
    $("#nombreEdit").val(nombre);
    $("#balanceEdit").val(balance); 
    $("#editButton").attr('data-id', id); 
    $("#exampleModal").modal("show"); 
  };



const editUsuario = async (id, nombre, balance) => {
  try {
    await axios.put(`http://localhost:3000/usuario?id=${id}`, {
      nombre,
      balance,
    });
    $("#exampleModal").modal("hide"); 
    location.reload(); 
  } catch (error) {
    throw new Error("Error al editar el usuario: " + error);
  }
};

  
  $("form:first").on("submit", async (e) => {
    e.preventDefault(); 
    let nombre = $("form:first input:first").val();
    let balance = Number($("form:first input:nth-child(2)").val());
    try {
      
      const response = await fetch("http://localhost:3000/usuario", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          balance,
        }),
      });
      $("form:first input:first").val(""); 
      $("form:first input:nth-child(2)").val(""); 
      location.reload(); 
    } catch (e) {
      alert("Algo salió mal ..." + e);
    }
  });

  
  $("form:last").on("submit", async (e) => {
    e.preventDefault();
    let emisor = $("form:last select:first").val();
    let receptor = $("form:last select:last").val();
    let monto = $("#monto").val();
    if (!monto || !emisor || !receptor) {
      alert("Debe seleccionar un emisor, receptor y monto a transferir");
      return false;
    }
    try {
     
      const response = await fetch("http://localhost:3000/transferencia", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emisor,
          receptor,
          monto,
        }),
      });
      const data = await response.json();
      location.reload(); 
    } catch (e) {
      console.log(e); 
      alert("Algo salió mal..." + e); 
    }
  });

 
  const getUsuarios = async () => {
    const response = await fetch("http://localhost:3000/usuarios");
    let data = await response.json();
    $(".usuarios").html(""); 
    
    $.each(data, (i, c) => {
      $(".usuarios").append(`
          <tr>
              <td>${c.nombre}</td>
              <td>${c.balance}</td>
              <td>
                  <button class="btn btn-warning mr-2 editar-btn"
                      data-nombre="${c.nombre}"
                      data-balance="${c.balance}"
                      data-id="${c.id}">
                      Editar
                  </button>
                  <button class="btn btn-danger eliminar-btn"
                      data-id="${c.id}">
                      Eliminar
                  </button>
              </td>
          </tr>
      `);
 
      $("#emisor").append(`<option value="${c.id}">${c.nombre}</option>`);
      $("#receptor").append(`<option value="${c.id}">${c.nombre}</option>`);
    });
  };

  getUsuarios();

  const allButton = document.querySelectorAll('table tbody button');
  allButton.forEach( element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const nombre = e.target.getAttribute('data-nombre');
      const balance = e.target.getAttribute('data-balance');
      const id= e.target.getAttribute('data-id');
      setInfoModal(nombre, balance, id)
      $("#exampleModal").modal("show");
    });
  });


const eliminarUsuario = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/usuario/${id}`);
    location.reload(); 
  } catch (error) {
    alert("Algo salió mal al eliminar el usuario: " + error);
  }
};


 const getTransferencias = async () => {
    const { data } = await axios.get("http://localhost:3000/transferencias");
    $(".transferencias").html(""); 
    
    data.forEach((t) => {
      $(".transferencias").append(`
       <tr>
       <td> ${formatDate(t.fecha)} </td>
       <td> ${t.emisor} </td>
       <td> ${t.receptor} </td>
       <td> ${t.monto} </td>

       </tr>
     `);
    });
  }

  
  getTransferencias();

 
  const formatDate = (date) => {
    const dateFormat = moment(date).format("L");
    const timeFormat = moment(date).format("LTS");
    return `${dateFormat} ${timeFormat}`;
  };

  formatDate(); 


$(document).on('click', '.editar-btn', function() {
  const nombre = $(this).data('nombre');
  const balance = $(this).data('balance');
  const id = $(this).data('id');
  setInfoModal(nombre, balance, id);
});


$("#editButton").on('click', async function() {
  const id = $(this).attr('data-id'); 
  const nombre = $("#nombreEdit").val(); 
  const balance = $("#balanceEdit").val();
  try {
    await editUsuario(id, nombre, balance); 
  } catch (error) {
    console.error("Error al editar el usuario:", error);
    alert("Algo salió mal al editar el usuario.");
  }
});

$(document).on('click', '.eliminar-btn', function() {
  const id = $(this).data('id');
  eliminarUsuario(id);
});
});
