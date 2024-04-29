resource "aws_key_pair" "mykey" {
    key_name   = "id_rsa"
    public_key = var.public_key
}

