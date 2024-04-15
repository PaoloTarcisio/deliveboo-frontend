<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    close() {
        console.log('Closing modal');
        this.$emit('update:show', false);
    },
    confirm() {
        console.log('Confirming action');
        this.$emit('confirm');
        this.close();
    }
  }
};
</script>

<template>
  <div v-if="show" class="modal-wrapper" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cambio Ristorante</h5>
          <button type="button" class="close" @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Stai aggiungendo un piatto da un ristorante diverso. Vuoi svuotare il carrello e aggiungere questo piatto?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">Annulla</button>
          <button type="button" class="btn btn-primary" @click="confirm">Procedi</button>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </div>
</template>

<style>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1040;
  overflow: hidden;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  z-index: 1;
}

.modal-dialog {
  position: relative;
  z-index: 2; /* Ensures modal dialog is above backdrop */
  display: flex;
  flex-direction: column;
  max-width: 500px; /* or your desired max width */
  width: 90%;
  background: white; /* Ensures content is visible */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
</style>