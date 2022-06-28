import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            currentData: true,
            page: 1,
            totalResults: 0
        }
    }

    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99dde63be15644d9a3881c702e8af715&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        // this.setState({loading: true, currentData: false});

        // let data = await fetch(url);
        // let parsedData = await data.json();
        // // console.log(parsedData);
        // this.setState({loading: false, currentData: true});


        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults
        // });


        this.updateNews();
    }


    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99dde63be15644d9a3881c702e8af715&page=1&pageSize=${this.props.pageSize}`;

        this.setState({loading: true, currentData: false});

        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        // console.log(parsedData);
        this.setState({loading: false, currentData: true});


        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            page: this.state.page + 1,
            loading: false
        });
        this.props.setProgress(100);
    }





    // handleNextClick = async () => {
    //     if((this.state.page + 1) > Math.ceil((this.state.totalResults)/(this.props.pageSize))){}
    //     else{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99dde63be15644d9a3881c702e8af715&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    //     this.setState({loading: true, currentData: false});

    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // console.log(parsedData);
    //     this.setState({loading: false, currentData: true});

    //     this.setState({
    //         articles: parsedData.articles,
    //         page: this.state.page+1,
    //         totalResults: parsedData.totalResults
    //     });
    // }
    // }


    // handlePrevClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99dde63be15644d9a3881c702e8af715&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    //     this.setState({loading: true, currentData: false});

    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // console.log(parsedData);
    //     this.setState({loading: false, currentData: true});

    //     this.setState({
    //         articles: parsedData.articles,
    //         page: this.state.page+-1,
    //         totalResults: parsedData.totalResults
    //     });
    // }



    fetchMoreData = async() => {
        // setTimeout(() => {
        //   this.setState({
        //     items: this.state.items.concat(Array.from({ length: 20 }))
        //   });
        // }, 1500);

        
        // this.setState({page: this.state.page + 1});
        // console.log(this.state.page);


        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99dde63be15644d9a3881c702e8af715&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        // this.setState({loading: true, currentData: false});

        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({loading: false, currentData: true});
        // console.log("Total Results => " + this.state.totalResults, "Articles Length => " + this.state.articles.length)

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults - 5,
            page: this.state.page + 1
        });
      };
    



  render() {
    return (
        
        <>
        <h1 className='text-center' style={{margin: '35px', marginTop: '90px'}}>NewsMonkey - Top Headlines</h1>

          {/* {this.state.loading && <Spinner/>} */}
            {/* {this.setState({page: this.state.page+1})} */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
        <div className="row">
            {this.state.articles.map((element) => {
                // console.log(element)
                return (
                    <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88): ""} imageUrl={element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name} />
                    </div>
                );
            })}
            
        </div>

        </div>

        </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <span>Page: {this.state.page}/{Math.ceil((this.state.totalResults)/(this.props.pageSize))}</span>
                <button disabled={ (this.state.page + 1) > Math.ceil((this.state.totalResults)/(this.props.pageSize)) } type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
      </>
    )
  }
}

export default News