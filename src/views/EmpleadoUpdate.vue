<template>
    <div class="container">
        <h5>Editar Empleado</h5>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="update()">
                    <p>Nombre Completo Empleado: <input type="text" v-model="payload.name" required/></p>
                    <p>Tipo de Vehiculo: <input type="text" v-model="payload.cars" required/></p>
                    <p>Numero de Placa: <input type="text" v-model="payload.placa" required/></p>
                    <p>color de Vehiculo: <input type="text" v-model="payload.color" required/></p>
                    <button type="submit" class="waves-effect waves-light btn-small">Editar</button>
                </form>
            </div>
        </div>
    
    </div>
</template>

<script>
export default {
    name: 'EmpleadoView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            payload: {
                name: null,
                cars: null,
                placa: null,
                color: null,
            }
        }
    },
    methods: {
        getOne() {
            this.axios({
                method: 'get',
                url: this.api + '/empleados/' + this.$route.params.id
            }).
            then((response) => {
                this.payload = response.data;
            }).
            catch((error) => {
                console.log(error);
            });
        },
        update() {
            if (confirm("Esta seguro de editar?.")) {
                this.axios({
                    method: 'patch',
                    url: this.api + '/empleados/' + this.$route.params.id,
                    data: this.payload
                }).
                then((response) => {
                    console.log(response);
                }).
                catch((error) => {
                    console.log(error);
                });
            }
        }
    },
    components: {

    },
    mounted() {
        this.getOne();
    }
}
</script>
