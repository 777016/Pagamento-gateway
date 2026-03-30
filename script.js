const SENHA = "153319";

/* LOGIN ADMIN */
function login(){
    let s = document.getElementById("senha").value;

    if(s === SENHA){
        document.getElementById("painel").style.display="block";
    } else {
        alert("Senha incorreta");
    }
}

/* GERAR LINK */
function gerar(){
    let valor = document.getElementById("valor").value;
    let pix = document.getElementById("pix").value;

    let link = location.origin + "/?valor="+valor+"&pix="+encodeURIComponent(pix);

    document.getElementById("link").innerText = link;
}

/* CARREGAR */
function carregar(){
    let p = new URLSearchParams(location.search);

    let valor = p.get("valor");
    let pix = p.get("pix");

    if(!valor || !pix) return;

    document.getElementById("valor").innerText = "R$ "+valor;
    document.getElementById("pix").value = pix;

    window.pix = pix;

    new QRCode(document.getElementById("qr"), {
        text: pix,
        width:200,
        height:200
    });
}

/* COPIAR */
function copiar(){
    navigator.clipboard.writeText(window.pix);

    let tempo = 50;

    let t = setInterval(()=>{
        document.getElementById("timer").innerText =
        "Redirecionando em "+tempo+"s";

        tempo--;

        if(tempo<=0){
            clearInterval(t);
            irForm();
        }

    },1000);
}

/* REDIRECIONAR */
function irForm(){
    let params = new URLSearchParams(location.search);
    window.location.href="form.html?"+params.toString();
}

/* EMAIL */
function enviar(){

    emailjs.init("SUA_PUBLIC_KEY");

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;

    emailjs.send("SERVICE_ID","TEMPLATE_ID",{
        nome: nome,
        email: email
    }).then(()=>{
        window.location.href="sucesso.html";
    });
}

/* AUTO LOAD */
carregar();
