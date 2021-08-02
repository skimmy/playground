public class RedBlackTreeNode {
    private Object key;
    private int color;
    private RedBlackTreeNode parent;
    private RedBlackTreeNode left;
    private RedBlackTreeNode right;

    public static int COLOR_RED = 1;
    public static int COLOR_BLACK = 0;

    public RedBlackTreeNode(int color) {
        if (color != 0 && color != 1) {
            throw new IllegalArgumentException("Bad color " + color);
        }
        this.color = color;
    }

    public getColor() {
        return this.color;
    }
}