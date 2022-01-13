/*
Author: CuriouslyCory
Website: https://curiouslycory.com
Twitter: @CuriouslyCory
*/

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract CuriouslyCoin is ERC20, ERC20Burnable, Ownable {
    uint256 public _maxSupply = 250000000 * 10 ** decimals();
    uint256 public _cost = 0.05 ether; //cost of 0.05 bnb
    string private constant _name = unicode"Curiously Coin";
    string private constant _symbol = unicode"CCN";
    
    constructor() ERC20(_name, _symbol) {
        // send the full supply to the contract.
        _mint(address(this), _maxSupply);
    }

    // local currency balance (ETH, BNB, SOL)
    function thisBalance() public view returns (uint) {
        return balanceOf(address(this));
    }
    
    // allow owner to withdraw any on chain currency from contract 
    function withdrawBalance() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
    
    // allow owner to withdraw tokens from contract
    function withdrawTokens(uint256 _amount) public  onlyOwner {
        require(thisBalance() > _amount, "Not Enough Tokens in Supply");
        _transfer(address(this), msg.sender, _amount);
    }
    
    // allow owner to withdraw foreign erc20 tokens from contract
    function withdrawERC20Tokens(address _contractAddress, uint256 _amount) public onlyOwner {
        IERC20(_contractAddress).transfer(msg.sender, _amount);
    }
    
    // purchase tokens directly from contract for presale
    function purchaseTokens(uint256 _amount) public payable {
        require(thisBalance() > _amount, "Not Enough Tokens in Supply");
        require(msg.value >= _cost * (_amount / 10 ** decimals()), "Not enough value for amount of tokens.");
        _transfer(address(this), msg.sender, _amount);
    }
    
    // update cost of presale tokens
    function setCost(uint256 _newCost) public onlyOwner {
        _cost = _newCost;
    }
    
    // read current cost (it's already public I don't need this)
    function getCost() public view returns(uint256) {
        return _cost;
    }

}