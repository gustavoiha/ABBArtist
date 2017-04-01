
// VueJS Instance
var vm = new Vue({
  el: '#app',
  data: {
    drawingboard: {
      width: 800,
      height: 500,
      posX: 0,
      poxY: 0
    },
    position: {
      x: 0,
      y: 0
    },
    counter: 0,
    drawInterval: 50
  },
  methods: {

    // Starts <drawTimer>, which draws a line according to the mouse position every <this.drawInterval> miliseconds
    startDrawing: function(){

      var vm = this;

      // Begins a new path in canvas. This allows user to create any number of paths by clicking and releasing mouse buttons
      drawingBoard.beginPath();
      drawingBoard.moveTo(this.position.x - this.drawingboard.posX, this.position.y - this.drawingboard.posY);
      //drawingBoard.moveTo(0,0);
      drawTimer = setInterval(function(){

        // Draws line that ends in mouse position
        drawingBoard.lineTo(vm.position.x - vm.drawingboard.posX, vm.position.y - vm.drawingboard.posY);
        drawingBoard.stroke();

        // Stores mouse position in .txt file every <this.drawInterval> miliseconds

      }, this.drawInterval);
    },

    // Called to stop <drawTimer> from executing
    stopDrawing: function(){
      clearInterval(drawTimer);
    },

    clearBoard: function(){
      drawingBoard.clearRect(0, 0, canvas.width, canvas.height);
    },

    // Updates mouse position coordinates
    updateCoordinates: function(event){
      this.position.x = event.clientX;
      this.position.y = event.clientY;
    }
  },
  mounted: function(){

    // Canvas rectangle properties
    var drawingBoardRect = document.getElementById("canvas").getBoundingClientRect();

    this.drawingboard.posX = drawingBoardRect.left;
    this.drawingboard.posY = drawingBoardRect.top;
  }
});

// Timer object
var drawTimer = null;

// Canvas drawing object
var drawingBoard = document.getElementById("canvas").getContext("2d");
