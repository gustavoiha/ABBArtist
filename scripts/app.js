
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
    drawInterval: 50,
    navBar: {
      width: '0',
      openWidth: '200px',
      isOpen: false,
      links: [
        {ref: '#', title: 'Home', isActive: true},
        {ref: '#', title: 'About', isActive: false},
        {ref: '#', title: 'Contacts', isActive: false}
      ]
    }
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

        // Send desired state to robot server
        vm.setRobotState({
          speed: 300,
          x: vm.position.x - vm.drawingboard.posX,
          y: vm.position.y - vm.drawingboard.posY,
          z: 0
        });

      }, this.drawInterval);
    },

    // Called to stop <drawTimer> from executing
    stopDrawing: function(){
      clearInterval(drawTimer);
    },

    // Called to clear drawing board
    clearBoard: function(){
      drawingBoard.clearRect(0, 0, canvas.width, canvas.height);
    },

    // Updates mouse position coordinates
    updateCoordinates: function(event){
      this.position.x = event.clientX;
      this.position.y = event.clientY;
    },

    // Switches Navigation Bar state from open to close or vice-versa
    switchNavBar: function(){
      return this.navBar.isOpen ? this.closeNavBar() : this.openNavBar();
    },

    // Opens Navigation Bar
    openNavBar: function(){
      this.navBar.width = this.navBar.openWidth;
      return this.navBar.isOpen = true;
    },

    // Closes Navigation Bar
    closeNavBar: function(){
      this.navBar.width = '0';
      return this.navBar.isOpen = false;
    },

    // Sends instruction to robot server
    setRobotState: function(state){
      console.log('begin');
      var http = new XMLHttpRequest();

      http.open("POST", "http://localhost:8080/", true);

      http.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      // Send data as JSON
      http.send(JSON.stringify(state));

      // Done
      http.onloadend = function () {
        console.log('end');
      };
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
