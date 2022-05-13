<script>
export default {
    data() {
        return {
            products: [
                { id: 1, name: "Foo" },
                { id: 2, name: "Bar" },
                { id: 3, name: "Baz" },
                { id: 4, name: "Foobar" }
            ],
            search: ""
        };
    },
    computed: {
        filteredProducts() {
            return this.products.filter(p => {
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
                <th>ID</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
            </tr>
        </tbody>
    </table>
</template>
