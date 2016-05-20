$("button").on("click", () => {
    $("button").css({
        "display": "none"
    })
    begin(11);
});

let count = 0;
let count2 = 0;
let stop = 0;

const changeColor = () => {
    if(count2 % 2 === 0){
        $("body").css({
            "background": "red",
            "color": "#0767b8"
        });
    }
    else {
        $("body").css({
            "background": "#0767b8",
            "color": "red"
        })
    }
    count2 ++;
};

const change = () => {
    console.log(count);
    $(".time").css({
        "display": "flex"
    });
    if(count % 2 === 0){
        $("body").transit({
            "background": "red"
        });
    }else {
        $("body").transit({
            "background": "#0767b8"
        });
    }
    count --;
    $(".time").html(count);
    if(count == 1){
        $(".time").html("BOOM!!!");
        clearInterval(stop);
        setInterval("changeColor()", 150);
    }
};

const begin = (num) => {
    count = num;
    stop = setInterval("change()", 1000);
};
