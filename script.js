// DOM Declartions
const newgridButton = document.querySelector("#newgrid");
const clearButton = document.querySelector('#clear');
const gridContainer = document.querySelector('.grid-container');
const chooseColorButton = document.querySelector('.options input');
const randomcolorButton = document.querySelector('#randomcolor');
const saveButton = document.querySelector('#save');


//ColorMode Variable Declaration
let colorMode = "custom";


//RandomColor

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }





//Grid Generating Function
function newGrid()
{
    while(gridContainer.firstChild)
        gridContainer.removeChild(gridContainer.firstChild);
    do
    {
        var gridSize = parseInt(window.prompt("Please enter the number of squares you want on one side of the grid ?","1"),10);

    }
    while(isNaN(gridSize));

    gridContainer.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
    for(let i=0;i<gridSize*gridSize;i++)
    {
        var newSquare = document.createElement('div');
        newSquare.classList.add("grid");
        gridContainer.appendChild(newSquare);
    }
    for(let i=0;i<gridContainer.children.length;i++)
    {
        gridContainer.children[i].addEventListener('mouseover',(e)=>{
            // console.log(e.target.style.background);
            let color;
            if(colorMode =="random")
            {
                color = getRandomColor();
            }
            else
            {
                color = chooseColorButton.value;
            }
            e.target.style.background = color;
        })
    }
}



// Clear function
function clear()
{
    while(gridContainer.firstChild)
    gridContainer.removeChild(gridContainer.firstChild);
}


  
//SetDefaultColor
// chooseColorButton.defaultValue = "#8ed081";


// Event Listeners
newgridButton.addEventListener('click',newGrid);

clearButton.addEventListener('click',clear);

randomcolorButton.addEventListener('click', function() {
    colorMode = "random";
})
chooseColorButton.addEventListener('click', function() {
    colorMode = "custom";
})


//Saving Feature
saveButton.addEventListener('click', function() {
    html2canvas(gridContainer).then(function(canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "Sketch.png";
        link.href = canvas.toDataURL();
        link.target = '_blank';
        link.click();
    });
});
