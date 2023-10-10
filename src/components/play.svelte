<script>
    // Votre logique de script ici, si nécessaire
</script>

<style>
  .pong-field {
    position: relative;
    /* Ajustements pour garantir que la "balle" (le bouton) soit visible */
    min-height: 200px; /* Ajoutez une hauteur minimale */
  }

  .paddle {
    position: absolute;
    height: 130px;
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

  .pong-ball {
    /* Styles spécifiques pour le bouton "balle" */
    width: 40px; /* Largeur du bouton */
    height: 40px; /* Hauteur du bouton */
    border-radius: 50%; /* Rend le bouton rond */
    background-color: #4F46E5; /* Couleur de fond Indigo-600 */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white; /* Texte blanc */
    font-weight: 600; /* Font semi-bold */
    cursor: pointer; /* Curseur de pointeur pour indiquer la cliquabilité */
    z-index: 2;
}

  .pong-ball:hover {
    background-color: #4338CA; /* Couleur Indigo-500 pour l'état de survol */
  }
</style>

<div class="h-full w-full flex items-center justify-center bg-black pong-field rounded-md shadow-xl">
  <div class="paddle left-paddle top-1/2 transform -translate-y-1/2"></div>
  <div class="center-line"></div>
  <div class="paddle right-paddle top-1/2 transform -translate-y-1/2"></div>

  <button
    type="button"
    class="pong-ball p-[35px]"
  >
    Play
  </button>
</div>
