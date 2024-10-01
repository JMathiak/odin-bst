import { Node } from "./Node.js";

class Tree{
    constructor(arr){
        arr = [...new Set(arr)]
        this.data = arr.sort((a,b) => a - b)
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

    // insert(root, value)
    // {
    
    //   if(root === null) return new Node(value)
        
    //   if(root.data === value) return root
    //   if(value < root.data)
    //   {
    //    root.left = this.insert(root.left, value)
    //   }else if(value > root.data)
    //   {
    //     root.right = this.insert(root.right, value)
    //   }

    //   return root
     
    // }

    insert(value)
    {
      let root = this.root
      let holder = null
      if(root == null)
      {
        this.root = new Node(value)
      }

      while(root != null)
      {
        holder = root
        if(value > holder.data)
        {
          root = root.right
        }else{
          root = root.left
        }
      }

      if(value < holder.data)
      {
        holder.left = new Node(value)
      }else if(value > holder.data)
      {
        holder.right = new Node(value)
      }



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



let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(test.root)
test.insert(32)

prettyPrint(test.root)

for(let i = 0; i < test.data.length; i++)
{
    console.log(test.data[i])
}