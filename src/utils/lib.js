


function timeStampToDateAndTime(timestamp){
    //converts timestamp, taken as let timeStamp = Date.now()
    //into date and time. 
    //ref https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    let a = new Date(timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    
    function formatTimeValue(t){
        if (t<10){
            return "0" + t.toString();
        }
        return t; 
    }

    let hour = formatTimeValue(a.getHours());
    let min = formatTimeValue(a.getMinutes());
    
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  //this function generates a unique id (good enough for this application)
  //ref. https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function generateUUID () { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

for (let i = 0; i<25; i++){
    console.log(generateUUID()); 
}

export { generateUUID }
export { timeStampToDateAndTime }