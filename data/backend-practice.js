const xhr = new XMLHttpRequest();

xhr.open('GET',"https://supersimplebackend.dev/documentation");
xhr.send();
xhr.addEventListener('load',() =>{
    console.log(xhr.response);
});