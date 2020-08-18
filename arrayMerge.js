Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

let a = ['atul', 'subhash','q'];
let b = ['subhash', 'jadhav','r'];
let d = ['sneha', 'jadhav','p' , 'q'];

let c = a.concat(b).concat(d).unique();

console.log(c);