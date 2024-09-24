import { Node } from "./Node.js";

class Tree{
    constructor(arr){
        arr = [...new Set(arr)]
        this.data = mergeSort(arr)
        this.root = this.buildTree(this.data)

    }

    buildTree(arr){
        if(arr.length <= 1) return null;

        let mid = Math.floor(arr.length / 2)
        let root = new Node(arr[mid])
        root.left = this.buildTree(arr.slice(0, mid))
        root.right = this.buildTree(arr.slice(mid))

        return root;
    }

    insert(root, value)
    {
    
      if(root === null) return new Node(value)
        
      if(root.data === value) return root
      if(value < root.data)
      {
       root.left = this.insert(root.left, value)
      }else if(value > root.data)
      {
        root.right = this.insert(root.right, value)
      }

      return root
     
    }
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  function merge(lArr, rArr){
    let sorted = []
    while(lArr.length && rArr.length){
        if(lArr[0] < rArr[0])
        {
            sorted.push(lArr.shift())
            
    
        }else{
            sorted.push(rArr.shift())
           
            
        }
    }
  
    return [...sorted, ...lArr, ...rArr]
}

function mergeSort(arr)
{
        if (arr.length <= 1)
        {
            return arr
        }
        let mid = Math.floor(arr.length / 2)
        let left = mergeSort(arr.slice(0, mid))
        let right = mergeSort(arr.slice(mid))
        return merge(left, right)
    
    
   

}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(test.root)
test.insert(test.root, 32)

prettyPrint(test.root)

for(let i = 0; i < test.data.length; i++)
{
    console.log(test.data[i])
}