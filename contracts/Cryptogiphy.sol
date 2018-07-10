pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Cryptogiphy is ERC721Token, Ownable {
  
    string public constant name = "Cryptogiphy";
    string public constant symbol = "CG";
    
    struct Giphtoken {
        string url;
    }
      
    Giphtoken[] public giphtokens;
    
    function mint(string _url) public payable onlyOwner {
        Giphtoken memory _giphtoken = Giphtoken({ url: _url });
        uint _giphtokenId = giphtokens.push(_giphtoken) - 1;
        
        _mint(msg.sender, _giphtokenId);
    }
}