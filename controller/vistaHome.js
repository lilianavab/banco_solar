export const vistaHome = (req,res) => {
    res.render("home",{
        layout:"main",
        title: "Banco Solar",
        titleListauno:"Agregar Nuevo Usuario",
        titleListados:"Realizar una Transferencia",
    
    })
}

