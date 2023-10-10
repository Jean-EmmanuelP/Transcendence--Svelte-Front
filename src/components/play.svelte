<script>
    // Votre logique de script ici, si nécessaire
  </script>
  
  <style>
    .pong-field {
      position: relative;
    }
  
    .paddle {
      position: absolute;
      height: 80px;
      width: 15px;
      background-color: white;
    }
  
    .left-paddle {
      left: 20px;
    }
  
    .right-paddle {
      right: 20px;
    }
  
    .center-line {
      position: absolute;
      width: 4px;
      height: 100%;
      background: repeating-linear-gradient(
        to bottom,
        white,
        white 10px,
        transparent 10px,
        transparent 20px
      );
      left: 50%;
      transform: translateX(-50%);
    }
  </style>
  
  <div class="h-full w-full flex items-center justify-center bg-black pong-field">
    <div class="paddle left-paddle top-1/2 transform -translate-y-1/2"></div>
    <div class="center-line"></div>
    <div class="paddle right-paddle top-1/2 transform -translate-y-1/2"></div>
  
    <button
      type="button"
      class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Play Pong
    </button>
  </div>
  