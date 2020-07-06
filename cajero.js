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
        document.getElementById("billetes").innerHTML += "<img src='"+ this.imagen.src + "'width=150px height=70px/>";
    }
    clear()
    {
        document.getElementById("billetes").innerHTML = "";
    }
}

var money = document.getElementById("dinero");
var boton = document.getElementById("retirar");
boton.addEventListener("click", retiroDinero);
document.getElementById("limpiare").addEventListener("click", limpiare);

var caja = [];

caja.push(new Billete(100, 7));
caja.push(new Billete(50, 10));
caja.push(new Billete(20, 15));
caja.push(new Billete(10, 20));

var res = "";
var sob = "";

var dinero = 0;
var entregado = [];
var papeles, div;
var resultado = document.getElementById("resultado");
var sobrante = document.getElementById("sobranteCaja");
var billetes = document.getElementById("billetes");

var min = caja[caja.length - 1];

for(var s of caja)
{
    sobrante.innerHTML += s.cantidad + (" billetes de $" + s.valor + "<br /> ");
}

function limpiare()
{
    resultado.innerHTML = '';
    //document.getElementById("billetes").innerHTML = '<br/> Nueva transaccion ';
    billetes.innerHTML = '';
}

function llenar()
{
    resultado.innerHTML += res;
    sobrante.innerHTML += sob;
}
function retiroDinero()
{
    resultado.innerHTML = '';
    sobrante.innerHTML = '';
    //document.getElementById("billetes").innerHTML = '<br/> Nueva transaccion ';
    billetes.innerHTML = '';

    dinero = parseInt(money.value);
    papeles = 0;
    div = 0;
    if(dinero % min.valor != 0)
    {
        return resultado.innerHTML += "No tenemos el valor de la moneda que quiere";
    }
    for(b in caja)
    {
        
        if(dinero > 0)
        {
            div = Math.floor(dinero / caja[b].valor);
            //caja[b.length - 1].cantidad -= papeles;
            if(div > caja[b].cantidad)
            {
                papeles = caja[b].cantidad;
            }
            else{
                papeles = div;
            }
            caja[b].cantidad = caja[b].cantidad - papeles;
            entregado.push(new Billete(caja[b].valor, papeles));
            dinero = dinero - (caja[b].valor * papeles);
        }
        sobrante.innerHTML += caja[b].cantidad + (" billetes de $" + caja[b].valor + "<br /> ");
    }
    
    if(dinero > 0)
    {
        return resultado.innerHTML = "Soy pobre, no tengo suficiente";
    }
    else 
    {
        for(var en of entregado)
        {
            if(en.cantidad > 0)
            {
                resultado.innerHTML += en.cantidad + (" billetes de $" + en.valor + "<br /> ");
                for(var x = 0;x < en.cantidad;x++)
                {
                    en.mostrar();
                }
            }
        }
    }
    //sobrante.innerHTML = '';
}