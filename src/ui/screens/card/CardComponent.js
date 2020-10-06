import React from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './styles/card.css'
import { Link } from 'react-router-dom'

import { cardListing } from '../../../redux/action/Action'

function CardComponent(props) {
    var listCount = 4;
    var numberOfPage = 10;
    const [list, setList] = useState([]);
    const [pagination, setPagination] = useState({})

    useEffect(() => {

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Applicatiom-Type': 'application/json'

            }
        }).then(response => response.json()).then((data) => {
            props.cardData(data)
            setList(data.slice(0, listCount))
            var page = [];
            var length = Math.ceil(data.length / listCount);
            var maxIndex = length > numberOfPage ? numberOfPage : length;

            for (let i = 1; i <= maxIndex; i++) {
                page.push(i);
            }
            var paginationObject = {
                currentIndex: 1,
                pageLength: length,
                startIndex: 1,
                endIndex: maxIndex,
                page: page
            }
            setPagination(paginationObject);
        })
    }, [])
    function paginationPressed(pageIndex) {
        let oldPagination = Object.assign({}, pagination);
        oldPagination.currentIndex = pageIndex;
        var nextIndex = pageIndex * listCount;
        setList(props.cardlist.slice(nextIndex - listCount, nextIndex))
        setPagination(oldPagination)
    }
    function nextButtonPressed(pageIndex) {
        if ((pageIndex <= pagination.endIndex)) {
            paginationPressed(pageIndex)
        } else {
            var page = [];
            var length = pagination.pageLength;
            let endIndex = pageIndex + (numberOfPage - 1)
            var maxIndex = length > endIndex ? endIndex : length;

            for (let i = pageIndex; i <= maxIndex; i++) {
                page.push(i);
            }
            var paginationObject = {
                currentIndex: pageIndex,
                pageLength: length,
                startIndex: pageIndex,
                endIndex: maxIndex,
                page: page
            }
            setPagination(paginationObject)
            var nextIndex = pageIndex * listCount;
            setList(props.cardlist.slice(nextIndex - listCount, nextIndex))
        }
    }

    function prevButtonPressed(pageIndex) {
        if ((pagination.startIndex <= pageIndex)) {
            paginationPressed(pageIndex)
        } else {
            var page = [];
            var length = pagination.pageLength;
            let startIndex = pageIndex - (numberOfPage - 1)
            for (let i = startIndex; i <= pageIndex; i++) {
                page.push(i);
            }
            var paginationObject = {
                currentIndex: pageIndex,
                pageLength: length,
                startIndex: startIndex,
                endIndex: pageIndex,
                page: page
            }
            setPagination(paginationObject)
            var nextIndex = pageIndex * listCount;
            setList(props.cardlist.slice(nextIndex - listCount, nextIndex))
        }
    }
    return (
        <div className="body">
            <div className=" header container-fluid">
                <h3 className="header-title">Welcome to Card Pagination</h3>
            </div>
            <div className="container-fluid">
                <div className="row">
                    {list.map((item) => {
                        return <div className=" col-lg-6">
                            <div className="card border-success mb-3">
                                <div className="card-header bg-transparent border-success">
                                    <h5 className="card-title text-success"> Card Id: {item.id}</h5>
                                </div>
                                <div className="card-body ">
                                    <h5 className="card-title">Title:</h5>
                                    <p className="card-text">{item.title}</p>
                                    <Link to={{
                                        pathname: '/cards',
                                        state: item
                                    }} className="btn btn-primary">Card Details</Link>
                                </div>
                            </div>
                        </div>;
                    })}
                </div>
            </div>
            {console.log('pagination', pagination)}
            {
                Object.keys(pagination).length > 0 ?
                    <div className="page-navigation-wrap container-fluid">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className={pagination.currentIndex == 1 ? "page-item disabled" : "page-item"}><a className="page-link" onClick={() => pagination.currentIndex == 1 ? null : prevButtonPressed(pagination.currentIndex - 1)}>Previous</a></li>
                                {(pagination.page).map((item) => {
                                    return <li className={(pagination.currentIndex == item) ? "page-item active" : "page-item"} onClick={() => paginationPressed(item)}><a className="page-link" >{item}</a></li>;
                                })}
                                <li className={pagination.pageLength == pagination.currentIndex ? "page-item disabled" : "page-item"}><a className="page-link" onClick={() => pagination.currentIndex == pagination.pageLength ? null : nextButtonPressed(pagination.currentIndex + 1)}>Next</a></li>
                            </ul>
                        </nav>
                    </div> : null
            }

        </div >
    )
}

const mapStateToProps = ({ cardReducer }) => {
    return {
        cardlist: cardReducer.cardlist
    }
}

const mapDispatchToProps = (dispatch) => {


    return {
        cardData: (data) => (dispatch(cardListing(data)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent)
