import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom'
import Web3 from 'web3';
var web3 = new Web3('https://mainnet.infura.io/slIWR5dcUEo82vulhg1s');

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block: []
    }
  }
  componentWillMount() {
    console.log(this.props)
    var block_hash = this.props.match.params.blockHash;
    this.getBlockState(block_hash);
  }
  async getBlockState(block_hash) {
    console.log("Block hash: " + block_hash);
    var currBlockObj = await web3.eth.getBlock(block_hash);
    console.log(JSON.stringify(currBlockObj));
    this.setState({
      block_id: currBlockObj.number,
      block_hash: currBlockObj.hash,
      block_ts: Date(parseInt(this.state.block.timestamp, 10)).toString(),
      block_txs: parseInt(currBlockObj.transactions.slice().length, 10),
      block: currBlockObj
    })
  }
  render() {
    const block = this.state.block;
    const difficulty = parseInt(block.difficulty, 10);
    const difficultyTotal = parseInt(block.totalDifficulty, 10);
    return (
      <div className="Block">
        <h2>Block Info</h2>
        <div>
          <table>
            <tbody>
              <tr><td className="tdLabel">Height: </td><td>{this.state.block.number}</td></tr>
              <tr><td className="tdLabel">Timestamp: </td><td>{this.state.block_ts}</td></tr>
              <tr><td className="tdLabel">Transactions: </td><td>{this.state.block_txs}</td></tr>
              <tr><td className="tdLabel">Hash: </td><td>{this.state.block.hash}</td></tr>
              <tr><td className="tdLabel">Parent hash: </td>
                <td><Link to={`../block/${this.state.block.parentHash}`}>{this.state.block.parentHash}</Link></td></tr>
              <tr><td className="tdLabel">Nonce: </td><td>{this.state.block.nonce}</td></tr>
              <tr><td className="tdLabel">Size: </td><td>{this.state.block.size} bytes</td></tr>
              <tr><td className="tdLabel">Difficulty: </td><td>{difficulty}</td></tr>
              <tr><td className="tdLabel">Difficulty: </td><td>{difficultyTotal}</td></tr>
              <tr><td className="tdLabel">Gas Limit: </td><td>{block.gasLimit}</td></tr>
              <tr><td className="tdLabel">Gas Used: </td><td>{block.gasUsed}</td></tr>
              <tr><td className="tdLabel">Sha3Uncles: </td><td>{block.sha3Uncles}</td></tr>
              <tr><td className="tdLabel">Extra data: </td><td>{this.state.block.extraData}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Block;