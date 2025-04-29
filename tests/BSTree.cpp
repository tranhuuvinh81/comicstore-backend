// #include <iostream>
// using namespace std;

// struct Node {
//     int sbd;
//     string hoTen;
//     Node *left;
//     Node *right;

//     Node (int s, string h, Node * l = NULL, Node * r = NULL){
//         sbd = s;
//         hoTen = h;
//         left = l;
//         right = r;
//     };
// };

// class BSTree{
//     private:
//         Node *root;

//         void makeEmpty(Node * &t){
//             if (t != NULL){
//                 makeEmpty(t->left);
//                 makeEmpty(t->right);
//                 delete t;
//                 t = NULL;
//             }
//         }

//         void insert(int sbd, string hoTen, Node *&t){
//             if (t == NULL){
//                 t = new Node(sbd, hoTen);
//             } else if (sbd < t->sbd){
//                 insert(sbd, hoTen, t->left);
//             } else if (sbd > t->sbd){
//                 insert(sbd, hoTen, t->right);
//             }
//         }

//         Node * search(int sbd, Node *t){
//             if (t == NULL) return NULL;
//             if (sbd < t->sbd){
//                 return search(sbd, t->left);
//             } else if (sbd > t->sbd){
//                 return search(sbd, t->right);
//             } else return t;
//         }

//     public:
//         BSTree(){
//             root = NULL;
//         }
//         ~BSTree(){
//             makeEmpty();
//         }

//         bool isEmpty(){
//             return root == NULL;
//         }

//         void makeEmpty(){
//             makeEmpty(root);
//         }

//         void insert(int sbd, string hoTen){
//             insert(sbd, hoTen, root);
//         }

//         Node * search(int sbd){
//             return search(sbd, root);
//         }
// };

// int main(){

//     BSTree cay;
//     cay.insert(1, "vinh");
//     cay.insert(2, "huu");
//     cay.insert(3, "tran");

//     Node *kq = cay.search(2);
//     if (kq != NULL){
//         cout << "Tim thay " << kq->hoTen;
//     }

//     return 0;
// }

#include <iostream>
using namespace std;

struct Node{
    int sbd;
    string hoTen;
    Node *left;
    Node *right;

    Node(int s, string h, Node *l = NULL, Node *r = NULL){
        sbd = s;
        hoTen = h;
        left = l;
        right = r;
    }
};

class BSTree{
    private:
        Node *root;

        void makeEmpty(Node *&t){
            if (t != NULL){
                makeEmpty(t->left);
                makeEmpty(t->right);
                delete t;
                t = NULL;
            }
        }

        void insert(int sbd, string hoTen, Node *&t){
            if (t == NULL){
                t = new Node(sbd, hoTen, t);
            } else if (sbd < t->sbd){
                insert(sbd, hoTen, t->left);
            } else if (sbd > t->sbd){
                insert(sbd, hoTen, t->right);
            }
        }

        Node * search(int sbd, Node *t){
            if (t == NULL){
                return NULL;
            }
            if (sbd < t->sbd){
                return search(sbd, t->left);
            } else if (sbd > t->sbd){
                return search(sbd, t->right);
            } else {
                return t;
            }
        }
    public:
        BSTree(){
            root = NULL;
        }
        ~BSTree(){
            makeEmpty();
        }

        bool isEmpty(){
            return root == NULL;
        }

        void makeEmpty(){
            makeEmpty(root);
        }

        void insert(int sbd, string hoTen){
            insert(sbd, hoTen, root);
        }

        Node *search(int sbd){
            search(sbd, root);
        }
};

int main(){

    BSTree cay;
    cay.insert(1, "cay");
    cay.insert(2, "gi do");

    Node * kq = cay.search(2);
    cout << "da tim thay " << kq->hoTen;
    return 0;
}