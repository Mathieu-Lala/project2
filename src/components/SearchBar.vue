<script>
// import CommuneEntry from '../data/CommuneEntry';

export default {
    props: {
        communes: Array,
    },
    data() {
        return {
            search: "",
        };
    },
    computed: {
        filteredCommunes() {
            return this.communes.filter(p => {
                return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            });
        }
    }
}
</script>

<template>
    <div class="search-wrapper panel-heading col-sm-12">
        <input type="text" v-model="search" placeholder="Search" /> <br> <br>
    </div>
    <table class="table" id="myTable">
        <thead>
            <tr>
                <th>Nom</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="commune in filteredCommunes.slice(0, 10)" :key="commune.name">
                <td>{{ commune.name }}</td>
            </tr>
        </tbody>
    </table>
</template>
