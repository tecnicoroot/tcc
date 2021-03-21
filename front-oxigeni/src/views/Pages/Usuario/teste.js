import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'

const users = [
    {
        name: 'DD'
    },
    {
        name: 'Ruan'
    },
    {
        name: 'Reginaldo'
    },
    {
        name: 'Renan'
    },
    {
        name: 'DD'
    },
    {
        name: 'Ruan'
    },
    {
        name: 'Reginaldo'
    },
    {
        name: 'Renan'
    },
    {
        name: 'DD'
    },
    {
        name: 'Ruan'
    },
    {
        name: 'Reginaldo'
    },
    {
        name: 'Renan'
    },
    {
        name: 'DD'
    },
    {
        name: 'Ruan'
    },
    {
        name: 'Reginaldo'
    },
    {
        name: 'Renan'
    },
]

export default class Teste2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            users: users,
            elements: [],
            perPage: 2,
            currentPage: 0,
        };
    }

    componentDidMount() {
        this.receivedData()
    }

    setElementsForCurrentpage() {
        let elements = this.state.users
            .slice(this.state.offset, this.state.offset + this.state.perPage)
            .map((users, index) => {
                return (
                    <div>
                        <p>{users.name}</p>
                    </div>
                )
            })
        this.setState({ elements: elements })
    }

    handlePageClick = (users) => {
        const selectedPage = users.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.setElementsForCurrentpage()
        })
    }

    receivedData() {
        this.setState({
            users: this.state.users,
            pageCount: Math.ceil(this.state.users.length / this.state.perPage)
        }, () => this.setElementsForCurrentpage())
    }

    render() {
        let paginationElement
        if (this.state.pageCount > 1) {
            paginationElement = (
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={this.state.pageCount}
                    onPageChange={this.handlePageClick}
                    forcePage={this.state.currentPage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"previous_page"}
                    nextLinkClassName={"next_page"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                />
            );
        }
        return (
            <div>
                <p>Teste</p>
                {paginationElement}
                {this.state.elements}
                {paginationElement}
            </div>
        )
    }
}
