import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Container, Segment} from 'semantic-ui-react'


class Navbar extends Component {
    
    render() {
       
        return (
            <Container>
                {navbar_grid}
            </Container>
        )
    }
}

const navbar_grid = (
    <Grid  columns={2}>
        <Grid.Row>
            <Grid.Column>
                <Header>Text</Header>
            </Grid.Column>
            <Grid.Column>
                <Header>Text</Header>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)



export default connect(null)(Navbar);