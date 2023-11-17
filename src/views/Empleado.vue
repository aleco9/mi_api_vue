<template>
    <div class="container">
        <h5>Empleado</h5>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="nuevo()" >
                    <h5>Nuevo Empleado</h5>
                    <p>Nombre Completo Empleado: <input type="text" v-model="payload.name" required/></p>
                    <p>Area de Trabajo:</p><p v-if="areas.length > 0">
                        <select v-model="payload.areaId">
                            <option :value="area.id" v-for="area in areas">{{area.name}}</option>
                        </select>
                    </p>
                    <p>Tipo de Vehiculo: <input type="text" v-model="payload.cars" required/></p>
                    <p>Numero de Placa: <input type="text" v-model="payload.placa" required/></p>
                    <p>color de Vehiculo: <input type="text" v-model="payload.color" required/></p>
                    <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
                </form>
            </div>
        </div>
    
        <div class="card">
                <div class="card-content">
                    <form @submit.prevent="getList()">
                        <h5>Buscar Empleado</h5>
                        <p>Nombre Empleado: <input type="search" v-model="search" @search="getList()" /></p>
                        <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
                    </form>
                </div>
            </div>
    
        <div class="card">
                <div class="card-content">
                    <h5>Filtros</h5>
                    <div class="input-field ">
                        <select @change="filter('cars',$event.target.value)">
                            <option value="" selected>Seleccionar Tipo Vehiculo</option>
                            <option value="moto">Moto</option>
                            <option value="automovil">Automovil</option>
                        </select>
                    </div>
                </div>
            </div>
    
        <div class="card">
            <div class="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Area</th>
                            <th>Vehiculo</th>
                            <th>Placa</th>
                            <th>Color</th>
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr v-for="item in items">
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.area.name}}</td>
                            <td>{{item.cars}}</td>
                            <td>{{item.placa}}</td>
                            <td>{{item.color}}</td>
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="eliminar(item.id)" >delete</i></a>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light blue "><i class="material-icons" @click="update(item.id)" >edit</i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            search: '',
            toFilter: '',
            areas: [],
            payload: {
                name: null,
                areaId: null,
                cars: null,
                placa: null,
                color: null,
            }
        }
    },
    methods: {
        filter(name, value) {
            this.toFilter = value === '' ? '' : '&' + name + '=' + value;
            this.getList();
        },
        update(id) {
            this.$router.push('/empleado/' + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar?.")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/empleados/' + id
                }).
                then((response) => {
                    this.getList();
                }).
                catch((error) => {
                    console.log(error);
                });
            }
        },
        nuevo() {
            this.axios({
                method: 'post',
                url: this.api + '/empleados',
                data: this.payload
            }).
            then((response) => {
                this.getList();
                console.log(response);
            }).
            catch((error) => {
                console.log(error);
            });
        },
        getList(name, value) {

            this.axios({
                method: 'get',
                url: this.api + '/empleados?_expand=area&q=' + this.search + this.toFilter
            }).
            then((response) => {
                this.items = response.data;
            }).
            catch((error) => {
                console.log(error);
            })
        },
        getCategoryList() {

            this.axios({
                method: 'get',
                url: this.api + '/areas'
            }).
            then((response) => {
                this.areas = response.data;
                const intervalo = setTimeout(() => {
                    this.intSelect(); 
                    clearTimeout(intervalo);
                }, 3000);
                
            }).
            catch((error) => {
                console.log(error);
            })
        },
        intSelect(){
            this.getList();
            this.getCategoryList();
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
        }
    },
    components: {

    },
    mounted() {
        this.getList();
        this.getCategoryList();
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }
}
</script>
