/*var imagenes = []
imagenes["100"] = "bs100.jpg";
imagenes["50"] = "bs50.jpg";
imagenes["20"] = "bs20.jpg";
imagenes["10"] = "bs10.jpg";
*/
imagenes = {
    "100": "bs100.jpg",
    "50": "bs50.jpg",
    "20": "bs20.jpg",
    "10": "bs10.jpg"
}

class Billete
{
    constructor(v, ca)
    {
        this.valor = v;
        this.cantidad = ca;
        
        this.imagen = new Image();
        this.imagen.src = imagenes[this.valor.toString()];
    }
    mostrar()
    {
        return "<img src='"+ this.imagen.src + "'width=150px height=70px/>";
    }
}

var money = document.getElementById("dinero");
var boton = document.getElementById("retirar");
boton.addEventListener("click", retiroDinero);

var resultado = document.getElementById("resultado");
var sobrante = document.getElementById("sobranteCaja");
var billetes = document.getElementById("billetes");

var caja = [];
caja.push(new Billete(100, 7));
caja.push(new Billete(50, 10));
caja.push(new Billete(20, 15));
caja.push(new Billete(10, 20));
//caja.push(new Billete(5, 20)); //No busque imagen :v
//Estas variables seran las que guarden la cadena concatenada al resultado, el restante de Caja y las imagenes
var res = "";
var sob = "";
var bill = "";

var dinero = 0;
var entregado = [];
var papeles, div;

//El valor min sera el valor de minima denominacion de billetes que tengamos para que no acceda a un error de no tener cambio exacto
//CajaTotal sera nuestro comparador sobre el monto que se quiere sacar y cuanto queda
//Para ambos hay que realizar un for de caja para saber los datos iniciales
var min = caja[0].valor;
var cajaTotal = 0;
for(var s of caja)
{
    sobrante.innerHTML += s.cantidad + (" billetes de $" + s.valor + "<br /> ");
    cajaTotal += s.valor * s.cantidad;
    if(min >= s.valor)
    {
        min = s.valor;
    }
}
//Con la funcion llenar() es mas facil acceder a la escritura de los billetes sobre el documento con innerHTML
function llenar()
{
    resultado.innerHTML = res + bill;
    sobrante.innerHTML = sob;
    //billetes.innerHTML = bill;
}
function retiroDinero()
{
    res = " ";
    sob = " ";
    bill = " ";

    dinero = parseInt(money.value);
    if(dinero % min != 0)
    {
        return resultado.innerHTML = "<strong>No tenemos el valor de la moneda que quiere</strong>";
    }
    for(b in caja)
    {
        if(dinero <= cajaTotal)
        {
            div = Math.floor(dinero / caja[b].valor);
            if(div > caja[b].cantidad)
            {
                papeles = caja[b].cantidad;
            }
            else{
                papeles = div;
            }
            caja[b].cantidad -= papeles;
            entregado.push(new Billete(caja[b].valor, papeles));
            dinero -= (caja[b].valor * papeles);
            cajaTotal -= dinero;
        }
        else 
        {
            return resultado.innerHTML = "<strong>No tengo suficiente dinero</strong>";
        }
        sob += caja[b].cantidad + (" billetes de $" + caja[b].valor + "<br /> ");
        if(papeles > 0)
        {
            res += papeles + (" billetes de $" + entregado[b].valor + "<br /> ");
            for(var x = 0;x < papeles;x++)
            {
                bill += entregado[b].mostrar();
            }
        }
    }
    llenar();
}
