import { $ } from "./selectors";
export async function waitForSelector(
    selector,
    intervaloTiempo= 100,
    timeOut= 5000
){
    return new Promise((res,rej)=>{
        let cont = 0;
        const intervalo = setInterval(()=>{
            cont ++;
            if (cont == timeOut / intervaloTiempo + 1) {
                clearInterval(intervalo);
                rej(false);                
            }
            if ($(selector)) {
                clearInterval(intervalo);
                res(true);
            }
        },500);
    });
}
export async function esperarParaScrollear(ofset= 60,time=100,timeOut= 10000){
    let y = 0;
    return new Promise((res,rej)=>{
        const intervalo = setInterval(()=>{
            if (y>=(document.body.scrollHeight - document.body.scrollTop)) {
                clearInterval(intervalo);
                res(true);
            }
            y +=ofset;
            if (timeOut/time+1 > y/ofset+2*ofset) {
                clearInterval(intervalo);
                rej(false);
            }
            window.scrollTo({top: y ,behavior : 'smooth'});
        },time);
    });
}