import React, {Component} from 'react'
import {SectionList, StyleSheet, Text} from 'react-native'
import {connect} from 'react-redux'
import {SearchBar} from 'react-native-elements'

import {ContactListItem} from '../components'
import {createSectionedData, findIndices} from '../utils'

class ContactListScreen extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      search: '',
    }
    this.checkItem = this.checkItem.bind(this)
  }

  componentDidMount() {
    // reset search when not in focus
    this.blurUnsubscribe = this.props.navigation.addListener('blur', () => {
      this.setState({search: ''})
    })
  }

  componentDidUpdate() {
    this.state.search.length > 0 ? this.search.focus() : this.search.blur()
  }

  componentWillUnmount() {
    this.blurUnsubscribe()
  }

  checkItem(itemName, itemId) {
    const {sectionIndex, nameIndex} = findIndices(
      itemName,
      itemId,
      this.state.data
    )

    return this.state.data[sectionIndex].data[nameIndex].checked
  }

  updateSearch(search) {
    this.setState({search})
  }

  render() {
    return (
      <SectionList
        sections={createSectionedData(
          this.state.search.length > 0
            ? this.props.contacts.filter((c) =>
                c.name.toLowerCase().includes(this.state.search.toLowerCase()))
            : this.props.contacts
        )}
        ListHeaderComponent={() => (
          <SearchBar
            ref={(search) => (this.search = search)}
            value={this.state.search}
            placeholder="Search"
            lightTheme
            round
            inputStyle={styles.inputStyle}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            clearIcon={{
              iconStyle: styles.iconStyle,
              containerStyle: styles.iconContainerStyle,
            }}
            onChangeText={this.updateSearch.bind(this)}
            onClear={() => this.setState({search: ''})}
            showCancel={true}
            autoCorrect={false}
          />
        )}
        renderItem={({item}) => (
          <ContactListItem navigation={this.props.navigation} {...item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyboardShouldPersistTaps="always"
        stickySectionHeadersEnabled
      />
    )
  }
}

const mapState = (state) => ({
  contacts: state.user.contacts.sort((a, b) => (a.name > b.name ? 1 : -1)),
})

export default connect(mapState)(ContactListScreen)

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  containerStyle: {
    borderTopColor: 'white',
    backgroundColor: 'white',
    padding: 10,
  },
  inputContainerStyle: {
    backgroundColor: '#e7e7e7',
  },
  inputStyle: {
    backgroundColor: '#e7e7e7',
  },
  clearIconStyle: {margin: 20},
  // clearContainerStyle: {margin: -10},
})
