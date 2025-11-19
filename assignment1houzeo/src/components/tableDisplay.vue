<template>
  <!-- Table heading -->
  <h3 class="text-center my-4">Table Data</h3>

  <!-- Bootstrap's Responsive wrapper to ensure horizontal scroll on smaller screens -->
  <div class="table-responsive">
    <table class="table table-bordered table-striped table-hover align-middle">
      <!-- Table Header -->
      <thead class="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email Address</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">D.O.B</th>
          <th scope="col">Gender</th>
          <th scope="col">Language</th>
          <th scope="col">City</th>
          <th scope="col">File</th>
        </tr>
      </thead>

      <!-- Table Body: Renders each submitted row -->
      <tbody>
        <!-- Loop through rows passed as props; each row represents one form submission -->
        <tr v-for="(row, i) in rows" :key="i">
          <td>{{ row.name }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.mobile }}</td>
          <!-- Date formatted into long readable format -->
          <td>{{ formattedDOB(row.birthdate) }}</td>
          <td>{{ row.gender }}</td>
          <!-- Convert array values to comma-separated string -->
          <td>{{ row.languages.join(', ') }}</td>
          <td>{{ row.cities.join(', ') }}</td>
          <!-- Display file name if uploaded -->
          <td>{{ row.file ? row.file.name : '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  // Receiving submitted rows from parent component as props(assignmentForm)
  props: { rows: Array },
  mounted(){
    console.log(this.rows);
  },
  methods: {
    // Convert raw birthdate value into readable format
    formattedDOB(birthdate) {
      if (!birthdate) return "";

      // Convert string or Date object into JS Date
      const date = birthdate instanceof Date ? birthdate : new Date(birthdate);

      // Validate date correctness
      if (isNaN(date.getTime())) return "";

      // Format date → "Month Day, Year"
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }


};

</script>

<style scoped>
.table-container {
  margin: 10px auto;
  max-width: 95%;
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.styled-table thead tr {
  background-color: #d4dafa;
  /* Header background */
  color: #0d0d0d;
  text-align: left;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  /* Spacing inside cells */
  border: 1px solid #ddd;
  /* Cell borders */
}

.styled-table tbody tr {
  border-bottom: 1px solid #ddd;
}
</style>
