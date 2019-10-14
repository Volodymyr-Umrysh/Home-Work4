var xhr = new XMLHttpRequest();
var ul=document.querySelector('.list-group')
var button=document.querySelector('button')
var input=document.querySelector('input')
xhr.open('GET', 'https://it-ebooks-api.info/v1/search/js', true);

xhr.send();

xhr.onreadystatechange = function() {
  if (xhr.readyState != 4) return;


  if (xhr.status != 200) {
    console.log(xhr.status + ': ' + xhr.statusText);
  } else {

      const data = JSON.parse(xhr.responseText)
    console.log(data.Books);
    data.Books.forEach(book => {
        let li=createLI(book);
        ul.appendChild(li)
    });
  }

}
function createLI(book){
    let li=document.createElement('li');
    li.className='list-group-item d-flex justify-content-between align-items-center';
//    IMG
    let img=document.createElement('img');
    img.src = book.Image
    img.className='picture';
    li.appendChild(img);
    // title
    let title=document.createElement('p');
    title.className='title';
    title.textContent=book.Title;
    li.appendChild(title);
    // subtitle
    let subtitle=document.createElement('p');
    subtitle.className='subtitle';
    subtitle.textContent=book.SubTitle;
    li.appendChild(subtitle);

    //discription
    let discription=document.createElement('p');
    discription.className='discription';
    discription.textContent=book.Description;
    li.appendChild(discription);
return li;
}

button.addEventListener('click', () => {
    const searchValue = input.value
    xhr.open('GET', `https://it-ebooks-api.info/v1/search/${searchValue}`, true);

xhr.send();

xhr.onreadystatechange = function() { 
  if (xhr.readyState != 4) return;


  if (xhr.status != 200) {
    console.log(xhr.status + ': ' + xhr.statusText);
  } else {

      const data = JSON.parse(xhr.responseText)
      if(+data.Total==0){
        ul.innerHTML = '<span>not found</span>';

      }
      else{
    console.log(data.Books);
    data.Books.forEach(book => {
        ul.innerHTML = ''
        let li=createLI(book);
        ul.appendChild(li)
    });
  }
  }
}
})