#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

struct Node {
    int sbd;
    string hoTen;
    Node *left;
    Node *right;
    int height;

    Node(int s, string ht, Node* l = NULL, Node* r = NULL, int h = 0) {
        sbd = s;
        hoTen = ht;
        left = l;
        right = r;
        height = h;
    }
};

class AVLTree {
public:
    AVLTree() {
        root = NULL;
    }

    ~AVLTree() {
        makeEmpty(root); 
    }

    bool isEmpty() {
        return root == NULL;
    }

    void makeEmpty() {
        makeEmpty(root);
    }

    void insert(int sbd, string hoTen) {
        insert(sbd, hoTen, root);
    }

    Node* search(int sbd) {
        return search(sbd, root);
    }

    void printLeave(){
        printLeave(root);
    }

private:
    Node* root;

    int height(Node* t) {
        return (t == NULL) ? -1 : t->height;
    }

    int max(int a, int b) { return (a > b) ? a : b; }

    void makeEmpty(Node*& t) {
        if (t != NULL) {
            makeEmpty(t->left);
            makeEmpty(t->right);
            delete t;
            t = NULL;
        }
    }

    void insert(int sbd, string hoTen, Node*& t) {
        if (t == NULL) {
            t = new Node(sbd, hoTen);
        } else if (sbd < t->sbd) {
            insert(sbd, hoTen, t->left);
        } else if (sbd > t->sbd) {
            insert(sbd, hoTen, t->right);
        } else {
            return;
        }

        t->height = max(height(t->left), height(t->right)) + 1;

        int check = balance(t);

        // LL
        if (check > 1 && sbd < t->left->sbd)
            rotateRight(t);

        // RR
        else if (check < -1 && sbd > t->right->sbd)
            rotateLeft(t);

        // LR
        else if (check > 1 && sbd > t->left->sbd) {
            rotateLeft(t->left);
            rotateRight(t);
        }

        // RL
        else if (check < -1 && sbd < t->right->sbd) {
            rotateRight(t->right);
            rotateLeft(t);
        }
    }

    Node* search(int sbd, Node* t) {
        if (t == NULL || t->sbd == sbd)
            return t;
        if (sbd < t->sbd)
            return search(sbd, t->left);
        else
            return search(sbd, t->right);
    }


    int balance(Node* t) {
        return (t == NULL) ? 0 : height(t->left) - height(t->right);
    }

    void rotateRight(Node*& k2) {
        Node* k1 = k2->left;
        k2->left = k1->right;
        k1->right = k2;

        k2->height = max(height(k2->left), height(k2->right)) + 1;
        k1->height = max(height(k1->left), height(k1->right)) + 1;

        k2 = k1;
    }

    void rotateLeft(Node*& k1) {
        Node* k2 = k1->right;
        k1->right = k2->left;
        k2->left = k1;

        k1->height = max(height(k1->left), height(k1->right)) + 1;
        k2->height = max(height(k2->left), height(k2->right)) + 1;

        k1 = k2;
    }

    //in các nút lá
    void printLeave(Node *r) {
        if (r == NULL) return;
        if (r->left == NULL && r->right == NULL) {
            cout << "SBD = " << r->sbd << " Ho ten: " << r->hoTen << endl;
        }
        printLeave(r->left);
        printLeave(r->right);
}

};

int main() {
    AVLTree avl;

    avl.insert(3, "Tuan");
    avl.insert(2, "Lan");
    avl.insert(1, "Cong");
    avl.insert(4, "Huong");
    avl.insert(5, "Binh");
    avl.insert(6, "Hai");
    avl.insert(7, "Son");
    avl.insert(16, "Mai");
    avl.insert(15, "Hong");

    avl.printLeave();

    Node* n1 = avl.search(4);
    Node* n2 = avl.search(9);

    if (n1 != NULL)
        cout << "Sinh vien voi SBD = 4 la " << n1->hoTen << endl;
    if (n2 == NULL)
        cout << "Khong tim thay sinh vien voi SBD = 9 " << endl;

    avl.makeEmpty();
    if (avl.isEmpty())
        cout << "Cay da bi xoa rong " << endl;

    return 0;
}
