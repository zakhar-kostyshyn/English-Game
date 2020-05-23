import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Grid, Header, List, Icon, Container, Segment} from 'semantic-ui-react'
import styled from 'styled-components'

const StyledSegment = styled(Segment)`
    margin: 5em 0em 0em !important;
    padding: 5em 0em !important;
`

class Footer extends Component {
    render() {
        return (
            <StyledSegment inverted vertical>
                <Container textAlign='center'>
                    <Grid divided inverted stackable>
                        <Grid.Column width={4}>
                            <Header inverted as='h4'content='Callback'/>
                            <List link inverted>
                                <List.Item icon="mail" as='a' content={
                                        'ilchick@gmail.com'}/>
                                <List.Item icon="mail" as='a' content={
                                    'zakharkostyshyn@gmail.com'}/>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Social networks' />
                                <Icon name='instagram' size='big' />
                                <Icon name="facebook official" size='big' />
                                <Icon name="telegram" size="big" />
                                <Icon name="youtube play" size="big" />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Github project' />
                            <Icon name="github" size="big" />
                            <List link inverted>
                            <List.Item as='a' content={
                                'Server side'
                            }/>
                            <List.Item as='a' content={
                                'Client size'
                            }/>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={6}>
                        <Header inverted as='h4' content='Description' />
                        <p>
                           Diploma work
                        </p>
                        </Grid.Column>
                    </Grid>
                </Container>
            </StyledSegment>
        )
    }
}




export default  connect(null)(Footer)