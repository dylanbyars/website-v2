import React, { Component } from 'react'
import jsonp from 'b-jsonp'

import A from '../../../components/A'

class Modal extends Component {
  constructor(props) {
    super(props)

    const groupWiki = {
      nonmetal: 'https://en.wikipedia.org/wiki/Nonmetal',
      ['noble gas']: 'https://en.wikipedia.org/wiki/Noble_gas',
      ['alkali metal']: 'https://en.wikipedia.org/wiki/Alkali_metal',
      ['alkaline earth metal']: 'https://en.wikipedia.org/wiki/Alkaline_earth_metal',
      metalloid: 'https://en.wikipedia.org/wiki/Metalloid',
      halogen: 'https://en.wikipedia.org/wiki/Halogen',
      metal: 'https://en.wikipedia.org/wiki/Post-transition_metal',
      ['transition metal']: 'https://en.wikipedia.org/wiki/Transition_metal',
      lanthanoid: 'https://en.wikipedia.org/wiki/Lanthanide',
      actinoid: 'https://en.wikipedia.org/wiki/Actinide'
    }

    this.state = {
      wikiSummary: null,
      wikiImage: null,
      groupWiki: groupWiki[this.props.element.groupBlock]
    }
  }

  componentDidMount() {
    // pull the last bit of the wiki url off
    const regex = /wiki\/(.*)/g
    const url = this.props.element.wiki
    const wikiTitle = regex.exec(url)[1]

    const wikiSummaryUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${wikiTitle}&format=json`

    const updateWikiSummary = data => {
      this.setState({
        wikiSummary: data
      })
    }

    // get first sentence of wiki page
    jsonp(wikiSummaryUrl, function(_, response) {
      if (wikiTitle === response[0]) {
        updateWikiSummary(response[2][0])
      }
    })

    // get an image from the wiki page
    const wikiImageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${wikiTitle}&prop=pageimages&format=json&pithumbsize=100`

    const updateWikiImage = data => {
      this.setState({
        wikiImage: data
      })
    }

    // get thumbnail image from wiki page
    jsonp(wikiImageUrl, function(_, response) {
      const pageId = Object.keys(response.query.pages)
      updateWikiImage(response.query.pages[pageId].thumbnail && response.query.pages[pageId].thumbnail.source)
    })
  }

  render() {
    const {
      element: {
        name,
        atomicMass,
        standardState,
        meltingPoint,
        boilingPoint,
        groupBlock,
        electronicConfiguration,
        yearDiscovered,
        wiki
      },
      closeModal
    } = this.props
    return (
      <div
        className="absolute pin flex justify-center items-center w-screen h-screen z-30"
        onClick={() => closeModal()}
      >
        {this.state.wikiSummary && (
          <div
            className="flex justify-between relative w-1/2 border bg-grey-lightest shadow-lg p-5"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute pin-t pin-r mr-4 mt-4 px-2 py-1 rounded-full trans trans-fast border border-indigo-light hover:border-indigo-dark text-indigo-light hover:text-indigo-dark hover text-sm"
              onClick={() => closeModal()}
            >
              close
            </button>
            <div className="w-1/2 flex flex-col justify-around items-center mr-5">
              <h1>{name}</h1>
              {this.state.wikiImage && <img src={this.state.wikiImage} alt={name} className="my-3" />}
              <p className="font-light leading-tight">
                {this.state.wikiSummary}
                <A classes={['ml-2', 'text-sm']} href={wiki}>
                  Wikipedia
                </A>
              </p>
            </div>

            <div className="flex justify-between w-1/2 py-10 ml-5">
              <div className="flex flex-col justify-between ">
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Group:</p>
                  {this.state.groupWiki ? (
                    <A classes={['capitalize']} href={this.state.groupWiki}>
                      {groupBlock}
                    </A>
                  ) : (
                    <p className="capitalize">{groupBlock}</p>
                  )}
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Standard State:</p>
                  <p className="capitalize">{standardState ? standardState : '???'}</p>
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Atomic Weight:</p>
                  <p>
                    {atomicMass}
                    <A classes={['ml-1', 'font-semibold']} href="https://en.wikipedia.org/wiki/Standard_atomic_weight">
                      A<sub>r</sub>
                    </A>
                  </p>
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Melting Point:</p>
                  <p>
                    {meltingPoint ? meltingPoint : '???'}
                    {meltingPoint && (
                      <A classes={['ml-1']} href="https://en.wikipedia.org/wiki/Kelvin">
                        K
                      </A>
                    )}
                  </p>
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Boiling Point:</p>
                  <p>
                    {boilingPoint ? boilingPoint : '???'}
                    {boilingPoint && (
                      <A classes={['ml-1']} href="https://en.wikipedia.org/wiki/Kelvin">
                        K
                      </A>
                    )}
                  </p>
                </div>
                <div className="flex my-1">
                  <A classes={['mr-1', 'font-semibold']} href="https://en.wikipedia.org/wiki/Electron_configuration">
                    Electron Configuration:
                  </A>
                  <p>{electronicConfiguration.replace(/\./g, ' ')}</p>
                </div>
                <div className="flex my-1">
                  <p className="mr-1 font-semibold">Year Discovered:</p>
                  <p>{yearDiscovered}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default Modal
