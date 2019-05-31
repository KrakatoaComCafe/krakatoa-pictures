import React from 'react'

function App() {
    return (
        <div id="root">
            <div className="main">

                <header className="header container">
                    <h1 className="header-logo">
                        Krakatoa Pictures
                    </h1>

                    <form className="header-busca">
                        <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo"/>
                        <input type="submit" value="Buscar" className="header-busca-submit"/>
                    </form>


                    <nav>
                        <ul className="header-nav">
                            <li className="header-nav-item">
                                <a href="#">
                                    ♡
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>


                <div className="fotos container">

                    <div className="foto">
                        <header className="foto-header">
                            <figure className="foto-usuario">

                                <img
                                     src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
                                     alt="" role="img"/>

                                <figcaption className="foto-usuario">
                                    <a href="#">
                                        alots
                                    </a>
                                </figcaption>
                            </figure>
                            <time className="foto-data">03/10/2016 20:13</time>
                        </header>

                        <img alt="foto" className="foto-src"
                             src="https://images.uncyc.org/pt/thumb/8/87/Diphiphic_bebado.jpg/300px-Diphiphic_bebado.jpg"/>

                        <div className="foto-info">
                            <div className="foto-info-likes">

                                <a href="#">
                                    alots_ssa
                                </a>

                                ,

                                <a href="#">
                                    rafael_rollo
                                </a>

                                curtiram

                            </div>

                            <p className="foto-info-legenda">
                                <a className="foto-info-autor">autor </a>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
                            </p>

                            <ul className="foto-info-comentarios">
                                <li className="comentario">
                                    <a className="foto-info-autor">seguidor </a>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad, molestiae.
                                </li>
                                <li className="comentario">
                                    <a className="foto-info-autor">seguidor </a>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt cumque earum
                                    molestias voluptatem
                                    modi nihil sit magnam ratione eveniet distinctio magni error asperiores
                                    dignissimos tempora
                                    expedita, laborum ex soluta hic maiores veritatis deserunt.
                                </li>
                                <li className="comentario">
                                    <a className="foto-info-autor">seguidor </a>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum laudantium quae
                                    ab fuga odio
                                    delectus maiores voluptatibus sit commodi quidem.
                                </li>
                            </ul>
                        </div>


                        <section className="fotoAtualizacoes">
                            <a href="#" className="fotoAtualizacoes-like">Likar</a>
                            <form className="fotoAtualizacoes-form">
                                <input type="text" placeholder="Adicione um comentário..."
                                       className="fotoAtualizacoes-form-campo"/>
                                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
