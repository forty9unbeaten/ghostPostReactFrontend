import React from 'react';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            filteredPosts: [],
            textInput: '',
            boastOrRoast: '',
            currentFilter: 'All',
            currentSort: 'Date',
        };
    }

    boastOrRoast = (postType) => {
        if (postType === 'B') {
            return 'Boast';
        }
        return 'Roast';
    };

    getDropdownValue = () => {
        const dropDown = document.getElementById('categoryDropdown');
        this.setState({
            ...this.state,
            boastOrRoast: dropDown[dropDown.selectedIndex].value,
        });
    };

    changeInput = (event) => {
        this.setState({
            ...this.state,
            textInput: event.target.value,
        });
    };

    setFilter = (event) => {
        const clickedFilter = event.target.innerHTML;
        const sortedPosts = this.sortPosts(
            this.state.currentSort,
            this.state.allPosts
        );
        this.setState({
            ...this.state,
            currentFilter: clickedFilter,
            filteredPosts: this.filterPosts(clickedFilter, sortedPosts),
        });
        this.highlightFilterButton(clickedFilter);
    };

    setSort = (event) => {
        const clickedSort = event.target.innerHTML;
        const posts = this.state.filteredPosts;
        this.setState({
            ...this.state,
            currentSort: clickedSort,
            filteredPosts: this.sortPosts(clickedSort, posts),
        });
        this.highlightSortButton(clickedSort);
    };

    filterPosts = (filter, posts) => {
        const allPosts = Array.from(posts);
        if (filter === 'Roasts') {
            return allPosts.filter((post) => post.category === 'R');
        } else if (filter === 'Boasts') {
            return allPosts.filter((post) => post.category === 'B');
        } else {
            return allPosts;
        }
    };

    sortPosts = (sort, posts) => {
        if (sort === 'Date') {
            return posts.sort((a, b) => {
                return new Date(b.create_date) - new Date(a.create_date);
            });
        } else {
            return posts.sort((a, b) => {
                return b.upvotes + b.downvotes - (a.upvotes + a.downvotes);
            });
        }
    };

    highlightFilterButton = (filter) => {
        const filterButtons = Array.from(
            document.getElementsByClassName('filterButton')
        );
        filterButtons.forEach((btn) => {
            btn.classList.remove('selected');
            if (filter === btn.innerHTML) {
                btn.classList.add('selected');
            }
        });
    };

    highlightSortButton = (sortType) => {
        const sortButtons = Array.from(
            document.getElementsByClassName('sortButton')
        );
        sortButtons.forEach((btn) => {
            btn.classList.remove('selected');
            if (sortType === btn.innerHTML) {
                btn.classList.add('selected');
            }
        });
    };

    upvote = (postId) => {
        const upvoteURL = `http://127.0.0.1:8000/api/posts/${postId}/upvote/`;
        fetch(upvoteURL, {
            method: 'POST',
        })
            .then((res) => {
                return res.json();
            })
            .then((post) => {
                this.setState({
                    ...this.state,
                    allPosts: this.updatePosts(post, this.state.allPosts),
                    filteredPosts: this.updatePosts(
                        post,
                        this.state.filteredPosts
                    ),
                });
            });
    };

    downvote = (postId) => {
        const downvoteURL = `http://127.0.0.1:8000/api/posts/${postId}/downvote/`;
        fetch(downvoteURL, {
            method: 'POST',
        })
            .then((res) => {
                return res.json();
            })
            .then((post) => {
                this.setState({
                    ...this.state,
                    allPosts: this.updatePosts(post, this.state.allPosts),
                    filteredPosts: this.updatePosts(
                        post,
                        this.state.filteredPosts
                    ),
                });
            });
    };

    updatePosts = (newPost, posts) => {
        return posts.map((post) => {
            if (newPost.id === post.id) {
                post.upvotes = newPost.upvotes;
                post.downvotes = newPost.downvotes;
            }
            return post;
        });
    };

    createPost = () => {
        const apiURL = 'http://127.0.0.1:8000/api/posts/';
        const { textInput, boastOrRoast } = this.state;
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                content: textInput,
                category: boastOrRoast,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const allPosts = this.state.allPosts.concat([data]);
                this.setState({
                    ...this.state,
                    allPosts: allPosts,
                    filteredPosts: this.filterPosts(
                        this.state.currentFilter,
                        allPosts
                    ),
                });
            });
    };

    componentDidMount = () => {
        const apiURL = 'http://127.0.0.1:8000/api/posts/';
        fetch(apiURL)
            .then((res) => {
                return res.json();
            })
            .then((posts) => {
                const sortedPosts = this.sortPosts(
                    this.state.currentSort,
                    posts
                );
                const filteredPosts = this.filterPosts(
                    this.state.currentFilter,
                    sortedPosts
                );
                this.setState({
                    ...this.state,
                    allPosts: posts,
                    filteredPosts: filteredPosts,
                });
            });
        this.getDropdownValue();
        this.highlightFilterButton(this.state.currentFilter);
        this.highlightSortButton(this.state.currentSort);
    };

    render = () => {
        const { filteredPosts, textInput } = this.state;
        return (
            <React.Fragment>
                <div id="headerContainer">
                    <h1>👻 Ghost Post 👻</h1>
                    <h3>Post your boasts or Roasts. Fire at will!</h3>
                </div>
                <div id="contentContainer">
                    <div id="postAndFilterContainer">
                        <div id="newPostContainer">
                            <textarea
                                value={textInput}
                                onChange={this.changeInput}
                            ></textarea>
                            <div id="inputLength">{textInput.length}/280</div>
                            <select
                                id="categoryDropdown"
                                onChange={this.getDropdownValue}
                            >
                                <option value="B">Boast</option>
                                <option value="R">Roast</option>
                            </select>
                            <div id="postBtn" onClick={this.createPost}>
                                Post
                            </div>
                        </div>
                        <div className="filterLabel">Filter</div>
                        <div id="filterContainer">
                            <div
                                className="filterButton"
                                onClick={this.setFilter}
                            >
                                All
                            </div>
                            <div
                                className="filterButton"
                                onClick={this.setFilter}
                            >
                                Boasts
                            </div>
                            <div
                                className="filterButton"
                                onClick={this.setFilter}
                            >
                                Roasts
                            </div>
                        </div>
                        <div className="filterLabel">Sort</div>
                        <div id="sortContainer">
                            <div className="sortButton" onClick={this.setSort}>
                                Date
                            </div>
                            <div className="sortButton" onClick={this.setSort}>
                                Votes
                            </div>
                        </div>
                    </div>
                    <div id="postContainer">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className={`post ${this.boastOrRoast(
                                    post.category
                                )}`}
                            >
                                <div className="postContent">
                                    {post.content}
                                </div>
                                <div
                                    className={`postCategory ${this.boastOrRoast(
                                        post.category
                                    ).toLowerCase()}`}
                                >
                                    {this.boastOrRoast(post.category)}
                                </div>
                                <div className="postDate">
                                    {new Date(
                                        post.create_date
                                    ).toLocaleString()}
                                </div>
                                <div className="buttonContainer">
                                    <div
                                        className="btn"
                                        onClick={() => {
                                            this.upvote(post.id);
                                        }}
                                    >
                                        ⬆️ {post.upvotes}
                                    </div>
                                    <div
                                        className="btn"
                                        onClick={() => {
                                            this.downvote(post.id);
                                        }}
                                    >
                                        ⬇️ -{post.downvotes}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    };
}

export default App;
