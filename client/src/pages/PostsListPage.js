import React from 'react'
import VirtualizedTable from '../components/Table'
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';

export default function ReactVirtualizedTable () {
  const [rows,updateRows] = React.useState([]);
    const getPosts = () => fetch("/api/posts")
      .then(res => res.json())
      .then(posts => {
        console.log(posts)
        updateRows(posts)
      })
      .catch(err => console.log("API ERROR: ", err));
    React.useEffect(() => {
      getPosts()
    }, [])
  return (
      <Container>
    <Paper style={{ height: 500, width: 800 }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 200,
            label: 'Name',
            dataKey: 'Project',
          },
          {
            width: 200,
            label: 'Client',
            dataKey: 'Client',
          },
          {
            width: 140,
            label: 'Hours',
            dataKey: 'Hours',
            numeric: true,
          },
          {
            width: 130,
            label: 'Billable Hours',
            dataKey: 'BillableHours',
            numeric: true,
          },
          {
            width: 120,
            label: 'Billable Amount',
            dataKey: 'BillableAmt',
            numeric: true,
          },
        ]}
      />
    </Paper>
      </Container>
  );
}
