'use strict';
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema ({
                            name: String,
                            message: String
                        });

mongoose.model('Message', messageSchema);