function main(){
    var string = "div(h1(\"heading\"), p(\"from\"),ul(li(\"easy\"),li(\"meeting\"),li(\"hard\")))";
    var outputString = convertToHtml(string);
    // console.log(outputString);
}


function convertToHtml(string){
    string = replaceAll(string, ",", "");
    console.log('---string----',string) 
    var outputString = "";
    let elements = [];
    var previousPointer = -1;
    for(var i=0;i<string.length;i++){
        var current = string.charAt(i);
        if(current==='('){
            var elementName = string.substring(previousPointer+1, i).trim();
            elements.push(elementName);
            previousPointer = i;
            outputString+= ("<"+elementName+">\n");
        }else if(current === ')'){
            let range = string.substring(previousPointer+1, i);
            range = replaceAll(range, "\"", "");
            previousPointer = i;
            outputString+= (range+"\n");
            var poppedElement = elements.pop();
            outputString+= ("</"+poppedElement+">\n");
        }
    }
    console.log(outputString);
    return outputString;
}


function replaceAll(string, find, replaceWith){
    while(string.indexOf(find)!=-1){
        string = string.replace(find, replaceWith);
    }
    return string;
}

// main();
test();
function test(){
    var arr = [1,2,3,4,5]
    var steps = 4
    console.log(' -arr--##- '+arr.slice(3))
    console.log(' -- '+rotateArray(arr, steps))
var res = []
    for( var i=1 ; i <= 5 ; i++){
        res.push(i)
    }
    console.log(' --- -- ',res)
}

function rotateArray(array, steps) {
    // check if there's even something to rotate
    if(array.length < 2) {
      return array.slice(0); // always return a copy
    }
  
    // get the number of actual rotations to perform
    var n = steps % array.length;
  
    // check if there's any need to rotate
    if(n === 0) {
      return array.slice(0); // always return a copy
    }
  
    // slice and concat
    if(n < 0) {
      return array.slice(n).concat(array.slice(0, array.length+n));
    } else {
      return array.slice(n).concat(array.slice(0, n));
    }
  }

// function test() {

//     console.log('test...')

//     let array = ['a',
//         'b',
//         'c',
//         'd']


//     for (let index = 0; index < array.length; index++) {
//         const element = array[index];
        
//         setTimeout(function () {
//             console.log('index inside : ' + index + ' element : ' + element);
//         }, 3000)

//     }
// }

// test();