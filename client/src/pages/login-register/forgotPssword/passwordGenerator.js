export function genPass(){
    var char = "";
    var numbers = "";
    var special ="";

    for(var i=0;i<4;i++){
        char = char + String.fromCharCode(97+Math.floor(Math.random()*26))
    }
    for(var i=0;i<4;i++){
        numbers = numbers + String.fromCharCode(48+(Math.floor(Math.random()*10)));
    }
    for(var i=35;i<=38;i++){
        special = special + String.fromCharCode(i)
    }

    var pass ="";

    for(i=0;i<4;i++){
        pass = ""+pass + char[i] + numbers[i] + special[i];
    }

    return pass;
}